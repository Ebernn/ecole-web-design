// Récupération des éléments de la page

const inputSalary = document.getElementById('input-salary'),
    inputBonus = document.getElementById('input-bonus'),
    inputAllocation = document.getElementById('input-allocation'),
    inputGenre = document.getElementById('input-gender'),
    inputDependents = document.getElementById('input-dependents'),
    buttonCompute = document.getElementById('compute'),
    outputIncomeTax = document.getElementById('output-income-tax'),
    outputEmployeeInsurance = document.getElementById('output-employee-insurance'),
    outputPensionPlan = document.getElementById('output-pension-plan'),
    outputExtras = document.getElementById('output-extras'),
    outputNetSalary = document.getElementById('output-net-salary');

// Déclaration de fonctions utiles au calcul et à l'affichage du salaire net

/**
 * Calcul du taux d'imposition avec réductions
 * @param {number} tax Taux d'imposition de base
 * @param {string} gender Genre de la personne
 * @param {number} dependants Nombre de personnes à charge
 * @returns {number} Taux d'imposition avec réductions
 */
const getIncomeTax = (tax, gender, dependants) => {
    // Si la personne est une femme, -2% est appliqué
    if (gender === 'Femme') tax -= 0.02;
    // Pour 3 personnes à charge -1% est appliqué, -2% pour plus
    if (dependants >= 3) tax -= dependants > 3 ? 0.02 : 0.01;
    return tax;
};

/**
 * Calcul des suppléments
 * @param {boolean} bonus 
 * @param {boolean} allocation 
 * @returns Total des suppléments
 */
const getExtras = (bonus, allocation) => {
    let extras = 0;
    // 100 de supplément pour les bonus
    if (bonus) extras += 100;
    // 150 de supplément pour les allocations
    if (allocation) extras += 150;
    return extras;
};

/**
 * Rend un nombre dans un bon format (utile pour l'affichage)
 * @param {number} count Un nombre quelconque
 * @returns ??? si ce n'est pas un nombre
 */
const format = count => isNaN(count) ? '???' : count;

// Ajout de l'écouteur d'évènement de click

buttonCompute.addEventListener('click', e => {
    // Calcul des déductions et suppléments
    const grossSalary = parseFloat(inputSalary.value),
        incomeTax = getIncomeTax(0.18, inputGenre.value, inputDependents.value) * grossSalary,
        employeeInsurance = 0.07 * grossSalary,
        pensionPlan = 0.05 * grossSalary,
        extras = getExtras(inputBonus.checked, inputAllocation.checked),
        netSalary = grossSalary - (incomeTax + employeeInsurance + pensionPlan) + extras;
    // Affichage des résultats
    outputIncomeTax.innerHTML = format(incomeTax);
    outputEmployeeInsurance.innerHTML = format(employeeInsurance);
    outputPensionPlan.innerHTML = format(pensionPlan);
    outputExtras.innerHTML = format(extras);
    outputNetSalary.innerHTML = format(netSalary);
    // Empêche le rafraichissement de la page
    e.preventDefault();
});