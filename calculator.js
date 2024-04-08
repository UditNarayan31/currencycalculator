document
  .getElementById("convertBtn")
  .addEventListener("click", async function () {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const data = await response.json();
      const exchangeRate = data.rates[toCurrency];

      if (exchangeRate) {
        const chargefee = (amount * 3) / 100;
        const chargefeettl = (amount * 3) / 100;
        const chargebase = data.base;
        const chargebasettl = data.base;
        const cargetotalbase = data.base;
        const totalConvertedAmount = amount - chargefee;
        const convertedAmount = (totalConvertedAmount * exchangeRate).toFixed(
          2
        );
        const element = document.getElementById("chargefeeDiv");
        const ttlelement = document.getElementById("chargefeettlDiv");
        const elementbase = document.getElementById("chargebaseDiv");
        const elementbasettl = document.getElementById("chargebasettlDiv");
        const elementtotal = document.getElementById("chargetotalDiv");
        const elementtotalbase = document.getElementById("chargebasetotalDiv");

        element.innerHTML = chargefee;
        ttlelement.innerHTML = chargefeettl;
        elementbase.innerHTML = chargebase;
        elementtotal.innerHTML = totalConvertedAmount;
        elementbasettl.innerHTML = chargebasettl;
        elementtotalbase.innerHTML = cargetotalbase;
        console.log("val", data);
        document.getElementById("convertedAmount").value = convertedAmount;
      } else {
        throw new Error(`Exchange rate for ${toCurrency} not found.`);
      }
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  });
