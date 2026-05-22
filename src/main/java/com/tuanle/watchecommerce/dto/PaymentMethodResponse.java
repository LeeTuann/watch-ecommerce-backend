package com.tuanle.watchecommerce.dto;

public class PaymentMethodResponse {
    private Long id;
    private String cardHolderName;
    private String cardNumber;
    private String expiryDate;
    private String cardType;

    public PaymentMethodResponse() {}

    public PaymentMethodResponse(Long id, String cardHolderName, String cardNumber, String expiryDate, String cardType) {
        this.id = id;
        this.cardHolderName = cardHolderName;
        this.cardNumber = maskCardNumber(cardNumber);
        this.expiryDate = expiryDate;
        this.cardType = cardType;
    }

    private String maskCardNumber(String number) {
        if (number == null) return null;
        String clean = number.replaceAll("\\s+", "");
        if (clean.length() < 4) {
            return "•••• •••• •••• " + clean;
        }
        String last4 = clean.substring(clean.length() - 4);
        return "•••• •••• •••• " + last4;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
        this.cardNumber = maskCardNumber(cardNumber);
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
