document.addEventListener("DOMContentLoaded", () => {
    const colHeads = document.querySelectorAll(".col_head");

    colHeads.forEach(colHead => {
        // Select the toggle image within the current col_head
        const toggleImage = colHead.querySelector(".toggle-collapse");

        // Check if the image is found before adding listeners
        if (toggleImage) {
            // Add click event listener to the toggle image
            toggleImage.addEventListener("click", (event) => {
                event.stopPropagation(); // Prevent event bubbling up
                colHead.classList.toggle("active");
            });
        }

        //  Prevent clicks on other interactive elements inside collapse from toggling it
        const collapsibleContent = colHead.querySelector(".collapse");
        if (collapsibleContent) {
            collapsibleContent.addEventListener("click", (event) => {
                // Prevent collapse toggle when clicking inside the collapsible content
                event.stopPropagation();
            });
        }
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const sideboard = document.getElementById("sideboard");
    sideboard.addEventListener("click", () => {

        sideboard.classList.toggle("open");
    });
});


function renderTaskAndAssets() {
    
    fetch('ddugky_project.json')
        .then(response => response.json())
        .then(data => {
           
            if (data.tasks && data.tasks.length > 0) {
              
                const task = data.tasks[0];

               
                const taskElement = document.querySelector('.msg');
                if (taskElement) {
                  
                    const taskTitleElement = taskElement.querySelector('h2');
                    const taskDescriptionElement = taskElement.querySelector('p');

                    if (taskTitleElement) taskTitleElement.textContent = task.task_title || 'Task Title Missing';
                    if (taskDescriptionElement) taskDescriptionElement.textContent = task.task_description || 'Description not provided.';
                }

                if (task.assets && task.assets.length > 0) {
                 
                    const cardElements = document.querySelectorAll('.card');

                  
                    task.assets.forEach((asset, index) => {
                        if (cardElements[index]) {
                            const cardElement = cardElements[index];
                            
                           
                            const assetTitleElement = cardElement.querySelector('h2');
                            const assetDescriptionElement = cardElement.querySelector('p');

                            if (assetTitleElement) assetTitleElement.textContent = asset.asset_title || 'Asset Title Missing';
                            if (assetDescriptionElement) assetDescriptionElement.textContent = asset.asset_description || 'Description not provided.';

                            if (asset.asset_content && asset.asset_content.includes('youtube.com')) {
                            
                                const assetImageElement = cardElement.querySelector('img');

                                if (assetImageElement) {
                               
                                    assetImageElement.style.cursor = 'pointer';
                                    assetImageElement.addEventListener('click', () => {
                                        window.open(asset.asset_content, '_blank');
                                    });
                                }
                            }
                        }
                    });
                }
            } else {
                console.error('No tasks found in the JSON data.');
            }
        })
        .catch(error => console.error('Error fetching or parsing JSON:', error));
}


renderTaskAndAssets();

