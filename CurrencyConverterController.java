package com.money.converter;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CurrencyConverterController {

    private static final String API_URL = "https://api.exchangerate-api.com/v4/latest/";

    @GetMapping("/convert")
    public double convert(@RequestParam String fromCurrency, @RequestParam String toCurrency, @RequestParam double amount) {
        RestTemplate restTemplate = new RestTemplate();
        String url = API_URL + fromCurrency;
        CurrencyResponse response = restTemplate.getForObject(url, CurrencyResponse.class);
        if (response != null && response.getRates().containsKey(toCurrency)) {
            double rate = response.getRates().get(toCurrency);
            return amount * rate;
        }
        return 0.0;
    }


    public static class CurrencyResponse {
        private String base;
        private String date;
        private java.util.Map<String, Double> rates;

        public String getBase() {
            return base;
        }

        public void setBase(String base) {
            this.base = base;
        }

        public java.util.Map<String, Double> getRates() {
            return rates;
        }

        public void setRates(java.util.Map<String, Double> rates) {
            this.rates = rates;
        }
    }
}
