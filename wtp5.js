document.getElementById('calculate').addEventListener('click', function() {
    const appliances = document.querySelectorAll('.appliance');
    const costPerKWh = parseFloat(document.getElementById('cost').value);
    let totalCost = 0;
    let totalEnergy = 0;

    if (isNaN(costPerKWh)) {
        document.getElementById('result').innerText = "Please enter a valid cost per kWh.";
        return;
    }

    appliances.forEach(appliance => {
        const wattage = parseFloat(appliance.querySelector('.wattage').value);
        const hours = parseFloat(appliance.querySelector('.hours').value);

        if (isNaN(wattage) || isNaN(hours)) {
            document.getElementById('result').innerText = "Please enter valid wattage and hours for all appliances.";
            return;
        }

        const applianceEnergy = (wattage * hours) / 1000; // Convert watts to kWh
        totalEnergy += applianceEnergy;
        const applianceCost = applianceEnergy * costPerKWh;
        totalCost += applianceCost; // Sum all appliance costs
    });

    const dailyConsumption = totalEnergy;
    const monthlyConsumption = dailyConsumption * 30; // assuming 30 days in a month
    const yearlyConsumption = dailyConsumption * 365; // assuming 365 days in a year

    const dailyCost = dailyConsumption * costPerKWh;
    const monthlyCost = monthlyConsumption * costPerKWh;
    const yearlyCost = yearlyConsumption * costPerKWh;

    // Update the DOM
    document.getElementById('daily-consumption').innerText = `Daily Consumption: ${dailyConsumption.toFixed(2)} kWh`;
    document.getElementById('monthly-consumption').innerText = `Monthly Consumption: ${monthlyConsumption.toFixed(2)} kWh`;
    document.getElementById('yearly-consumption').innerText = `Yearly Consumption: ${yearlyConsumption.toFixed(2)} kWh`;

    document.getElementById('daily-cost').innerText = `Cost: RS.${dailyCost.toFixed(2)}`;
    document.getElementById('monthly-cost').innerText = `Cost: RS.${monthlyCost.toFixed(2)}`;
    document.getElementById('yearly-cost').innerText = `Cost: RS.${yearlyCost.toFixed(2)}`;
});

// Add functionality for the "Add Appliance" button
document.getElementById('add-appliance').addEventListener('click', function() {
    const applianceList = document.getElementById('appliance-list');
    const newAppliance = document.createElement('div');
    newAppliance.classList.add('appliance');
    newAppliance.innerHTML = `
        <input type="number" class="wattage" placeholder="Wattage (W)" required>
        <input type="number" class="hours" placeholder="Hours used per day" required>
        <button class="remove-appliance">Remove</button>
    `;
    
    applianceList.appendChild(newAppliance);

    // Add event listener to the remove button
    newAppliance.querySelector('.remove-appliance').addEventListener('click', function() {
        applianceList.removeChild(newAppliance);
    });
});
