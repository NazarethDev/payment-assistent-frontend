export default function formatBoletoLinhaDigitavel(value) {

    const numbers = value.replace(/\D/g, "").slice(0, 47);

    const parts = [
        numbers.slice(0, 5),
        numbers.slice(5, 10),
        numbers.slice(10, 15),
        numbers.slice(15, 21),
        numbers.slice(21, 26),
        numbers.slice(26, 32),
        numbers.slice(32, 33),
        numbers.slice(33, 47)
    ];

    let formatted = "";

    if (parts[0]) formatted += parts[0];
    if (parts[1]) formatted += "." + parts[1];
    if (parts[2]) formatted += " " + parts[2];
    if (parts[3]) formatted += "." + parts[3];
    if (parts[4]) formatted += " " + parts[4];
    if (parts[5]) formatted += "." + parts[5];
    if (parts[6]) formatted += " " + parts[6];
    if (parts[7]) formatted += " " + parts[7];

    return formatted;
}