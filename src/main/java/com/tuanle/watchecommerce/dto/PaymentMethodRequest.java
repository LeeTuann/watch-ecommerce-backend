package com.tuanle.watchecommerce.dto;

public class PaymentMethodRequest {
    private String cardHolderName;
    private String cardNumber;
    private String expiryDate;
    private String cardType;

    public PaymentMethodRequest() {}

    public PaymentMethodRequest(String cardHolderName, String cardNumber, String expiryDate, String cardType) {
        this.cardHolderName = cardHolderName;
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cardType = cardType;
    }

    public String getCardHolderName() {
        return cardHolderName;
    }

    public void setCardHolderName(String cardHolderName) {
        this.cardHolderName = cardHolderName;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }
}
