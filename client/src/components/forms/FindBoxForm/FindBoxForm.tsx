import { FormButton, FormWrapper, FormInput, FormSelect } from '@/components';
import { Typography, Space, Button } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import s from './FindBoxForm.module.less';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  useBoxContext,
  boxResponse,
  setStationAvailable,
  APIManager,
  fetcher,
  FormMessage,
  ID_NUMBER_REQUIRED,
  TYPE_OF_BOX_REQUIRED,
  recognizeError,
  isFailedFetched,
  openNotification,
  NO_CONNECT_WITH_SERVER,
  useAuthContext,
} from '@/utils';
import { Spinner } from '@components/Layout/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';

const { Text } = Typography;

const options = [
  {
    value: 0,
    label: 'Puszka Wolontariusza',
  },
  {
    value: 10000,
    label: 'Puszka Stacjonarna',
  },
  {
    value: 20000,
    label: 'Puszka Firmowa',
  },
];

type FormInput = {
  id_number: string;
  box_type: 0 | 10000 | 20000;
};

export const FindBoxForm = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState<FormMessage | undefined>();
  const [form] = useForm();
  const { createBox } = useBoxContext();
  const { username } = useAuthContext();

  setStationAvailable();

  const mutation = useMutation<boxResponse, unknown, number, unknown>({
    mutationFn: (volunteerId: number) => fetcher(APIManager.findBoxURL(volunteerId)),
    onError: (error) => {
      setMessage({ type: 'error', content: recognizeError(error) });
    },
    onSuccess: (data) => {
      setMessage({
        type: 'success',
        content: `Pomyślnie znaleziono puszkę dla identyfikatora: ${data.collectorIdentifier}`,
      });
      createBox(
        [data.collector.firstName, data.collector.lastName].join(' '),
        data.collectorIdentifier,
        data.id.toString(),
      );
      form.resetFields();
      // TODO: Probalby can get rid of setTimeout
      setTimeout(() => navigate('/liczymy/boxes/settle/2'), 1000);
    },
  });

  // TODO: Move that into some mutation - wrapper
  if (!username) {
    navigate('/liczymy/boxes/settle');
    return null;
  }

  const id = parseInt(username.slice(-2));
  const goOnABreakMutation = useMutation({
    mutationFn: () =>
      fetcher(`${APIManager.baseAPIRUrl}/stations/${id}/unknown`, {
        method: 'POST',
      }),
    onSuccess: () => navigate('/liczymy/boxes/settle'),
    onError: (error) => {
      if (isFailedFetched(error)) openNotification('error', NO_CONNECT_WITH_SERVER);
    },
  });

  const onFinish = (values: FormInput) => {
    const volunteerId = parseInt(values.id_number) + values.box_type;
    if (!isNaN(volunteerId)) {
      mutation.mutate(volunteerId);
      setMessage(undefined);
    } else {
      setMessage({ type: 'error', content: 'Podano nieprawidłowy identyfikator' });
    }
  };

  const handleBreak = () => {
    if (isNaN(id)) {
      navigate('/liczymy/boxes/settle');
    } else {
      goOnABreakMutation.mutate();
    }
  };

  return (
    <Content className={s.container}>
      <FormWrapper
        form={form}
        onFinish={onFinish}
        name="boxToSettleForm"
        className={s.form}
        borderColor="black"
        label="Znajdź puszkę do rozliczenia"
        message={message}
        disabled={mutation.isLoading || goOnABreakMutation.isLoading}
        initialValues={{ box_type: 0 }}
      >
        <Space direction="vertical">
          <Space direction="vertical" className={s.form}>
            <Space className={s.inputContainer} size={0}>
              <Text className={s.text}>Numer Identyfikatora:</Text>
              <FormInput
                name="id_number"
                className={s.input}
                placeholder="Np. 123"
                rules={[{ required: true, message: ID_NUMBER_REQUIRED }]}
              />
            </Space>
            <FormSelect
              name="box_type"
              options={options}
              placeholder="Wybierz rodzaj"
              className={s.select}
              rules={[{ required: true, message: TYPE_OF_BOX_REQUIRED }]}
            />
            <FormButton htmlType="submit" type="primary">
              {mutation.isLoading ? <Spinner /> : 'Wyszukaj puszkę'}
            </FormButton>
          </Space>
        </Space>
      </FormWrapper>
      <Button
        disabled={goOnABreakMutation.isLoading || mutation.isLoading}
        type="primary"
        className={s.break}
        onClick={handleBreak}
      >
        {goOnABreakMutation.isLoading ? (
          <Spinner />
        ) : (
          'Nie chcę rozliczać dalej - przerwa'
        )}
      </Button>
    </Content>
  );
};
