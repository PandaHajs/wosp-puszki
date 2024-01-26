import collected from '@assets/collected-text.svg';
import eskarbonka from '@assets/eskarbonka.svg';
import { Space, Typography } from 'antd';
import s from './Currencies.module.less';
import { currencies, parseMoney, useAmountsQuery } from '@/utils';

export const Currencies = () => {
  const { data } = useAmountsQuery();

  const collectedCurrencies: Record<currencies, string> = {
    pln: parseMoney(data.amount_PLN, 'pln'),
    usd: parseMoney(data.amount_USD, 'usd'),
    eur: parseMoney(data.amount_EUR, 'eur'),
    gbp: parseMoney(data.amount_GBP, 'gbp'),
  };

  return (
    <>
      <img
        id="rescale"
        height={100}
        src={collected}
        alt=""
        className={s.collectedImage}
      />
      <Typography.Title id="rescale" className={s.collectedText}>
        {parseMoney(data.amount_total_in_PLN, 'pln')}
      </Typography.Title>
      <Space className={s.currencies}>
        <Typography.Paragraph id="rescale">
          {collectedCurrencies.pln}
        </Typography.Paragraph>
        <Typography.Paragraph id="rescale">
          {collectedCurrencies.eur}
        </Typography.Paragraph>
        <Typography.Paragraph id="rescale">
          {collectedCurrencies.gbp}
        </Typography.Paragraph>
        <Typography.Paragraph id="rescale">
          {collectedCurrencies.usd}
        </Typography.Paragraph>
      </Space>
    </>
  );
};
