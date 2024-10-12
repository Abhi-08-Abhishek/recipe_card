document.addEventListener('DOMContentLoaded', () => {
    const recipes = [
        {
            title: "Chocolate Cake",
            image: "images/cake2.jpg",
            prepTime: "30 minutes",
            servings: "8",
            ingredients: [
                "2 cups of flour",
                "1 cup of sugar",
                "1 cup of cocoa powder",
                "1.5 tsp baking powder",
                "1 tsp salt",
                "2 large eggs",
                "1 cup of milk",
                "1/2 cup of vegetable oil"
            ],
            steps: [
                "Preheat the oven to 350°F (175°C).",
                "Mix all dry ingredients.",
                "Add wet ingredients and mix well.",
                "Pour the mixture into a cake pan.",
                "Bake for 30 minutes.",
                "Let cool and serve."
            ]
        },
        {
            title: "Vanilla Cupcakes",
            image: "images/cupcake.jpg",
            prepTime: "20 minutes",
            servings: "12",
            ingredients: [
                "1.5 cups of flour",
                "1 cup of sugar",
                "1/2 cup of butter",
                "2 large eggs",
                "1 cup of milk",
                "2 tsp vanilla extract",
                "1.5 tsp baking powder",
                "1/2 tsp salt"
            ],
            steps: [
                "Preheat the oven to 350°F (175°C).",
                "Cream together butter and sugar.",
                "Add eggs and vanilla, mix well.",
                "Combine dry ingredients and add to the wet mixture.",
                "Pour batter into cupcake liners.",
                "Bake for 18-20 minutes."
            ]
        }
        // Add more recipes as needed
    ];

    let currentRecipeIndex = 0;
    let currentStepIndex = 0;

    const updateRecipe = (index) => {
        const recipe = recipes[index];
        document.getElementById('recipe-title').textContent = recipe.title;
        document.querySelector('.recipe-image').src = recipe.image;
        document.getElementById('prep-time').textContent = recipe.prepTime;
        document.getElementById('servings').textContent = recipe.servings;
        
        const ingredientsList = document.querySelector('.ingredients');
        ingredientsList.innerHTML = recipe.ingredients.map(item => `<li>${item}</li>`).join('');
        
        const stepsList = document.querySelector('.steps');
        ingredientsList.innerHTML = recipe.steps.map(item => `<li>${item}</li>`).join('');
        
        stepsList.innerHTML = ""; // Clear previous steps
        stepsList.classList.add('hidden');  //Hide steps initially
        
        // Reset step index
        currentStepIndex = 0;
    };

    const toggleIngredientsButton = document.getElementById('toggle-ingredients');
    const ingredientsList = document.querySelector('.ingredients');
    
    const toggleStepsButton = document.getElementById('toggle-steps');
    const stepsList = document.querySelector('.steps');
    
    const startCookingButton = document.getElementById('start-cooking');
    const progressBar = document.getElementById('progress-bar');
    const progress = progressBar.querySelector('.progress');

    toggleIngredientsButton.addEventListener('click', () => {
        const isHidden = ingredientsList.classList.toggle('hidden');
        toggleIngredientsButton.setAttribute('aria-expanded', !isHidden);
        toggleIngredientsButton.textContent = isHidden ? 'Show Ingredients' : 'Hide Ingredients';
    });

    toggleStepsButton.addEventListener('click', () => {
        const isHidden = stepsList.classList.toggle('hidden');
        toggleStepsButton.setAttribute('aria-expanded', !isHidden);
        toggleStepsButton.textContent = isHidden ? 'Show Steps' : 'Hide Steps';
    });

    startCookingButton.addEventListener('click', () => {
        progressBar.style.display = 'block';
        progress.style.width = '0%';
        currentStepIndex = 0; // Reset step index
        stepsList.classList.remove('hidden'); // Show the steps list

        const totalSteps = recipes[currentRecipeIndex].steps.length;

        const showNextStep = () => {
            if (currentStepIndex < totalSteps) {
                const step = document.createElement('li');
                step.textContent = recipes[currentRecipeIndex].steps[currentStepIndex];
                stepsList.appendChild(step);
                currentStepIndex++;

                // Update progress bar
                const width = (currentStepIndex / totalSteps) * 100;
                progress.style.width = width + '%';

                // Schedule the next step
                setTimeout(showNextStep, 2000); // Show next step after 2 seconds
            } else {
                // Hide progress bar once all steps are shown
                progressBar.style.display = 'none';
            }
        };

        showNextStep(); // Start showing the steps
    });

    // Navigation functionality
    document.getElementById('prev-recipe').addEventListener('click', () => {
        currentRecipeIndex = (currentRecipeIndex > 0) ? currentRecipeIndex - 1 : recipes.length - 1;
        updateRecipe(currentRecipeIndex);
    });

    document.getElementById('next-recipe').addEventListener('click', () => {
        currentRecipeIndex = (currentRecipeIndex < recipes.length - 1) ? currentRecipeIndex + 1 : 0;
        updateRecipe(currentRecipeIndex);
    });

    // Initialize with the first recipe
    updateRecipe(currentRecipeIndex);
});
