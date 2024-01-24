<?php

namespace App\Lib\Rates;

class StaticRatesFetcher implements RatesFetcher
{
    private const USD_RATES_CONFIG = 'rates.usd';
    private const EUR_RATES_CONFIG = 'rates.eur';
    private const GBP_RATES_CONFIG = 'rates.gbp';

    private $usd;
    private $eur;
    private $gbp;

    public function __construct()
    {
        $this->usd = config(self::USD_RATES_CONFIG);
        $this->eur = config(self::EUR_RATES_CONFIG);
        $this->gbp = config(self::GBP_RATES_CONFIG);
    }

    public function fetchRates(): array
    {
        return (new Rates($this->usd, $this->eur, $this->gbp))
            ->toArray();
    }
}
