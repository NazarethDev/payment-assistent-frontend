import { Boleto } from "boleto.js";

export const parseBoletoData = (rawText) => {
    try {
        const b = new Boleto(rawText);
        return {
            barCode: rawText,
            amount: b.amount(),
            expirationDate: b.expirationDate().toISOString().split('T')[0],
            bankName: b.bank(),
            bankCode: rawText.substring(0, 3)
        };
    } catch (e) {
        return null;
    }
};