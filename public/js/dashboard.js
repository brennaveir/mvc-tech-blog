const newPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blogpost-title').value.trim();
    const contents = document.querySelector('#blogpost-contents').value.trim();
  
    if (title && contents) {
      const response = await fetch(`/api/blogpost`, {
        method: 'POST',
        body: JSON.stringify({ title, contents }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  console.log(response)
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create blogpost');
      }
    }
  };


    
 function updateFormHandler () {
  document.getElementById("update-form").style.display = 'flex'
 } 
  
  
  const updateButtonHandler = async (event) => {
    console.log("clicked")
    
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      const response = await fetch(`api/blogpost/${id}`, {
        method: 'PUT',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update project');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    console.log("clicked")
    event.preventDefault()
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
     
      const response = await fetch(`api/blogpost/${id}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json'}
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        console.log(response)
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-blogpost-form')
    .addEventListener('submit', newPostHandler);

    document
    .querySelector('#updateForm')
    .addEventListener('click', updateFormHandler)
    
    document
    .querySelector('#updateBtn')
    .addEventListener('click', updateButtonHandler)

  
  document
    .querySelector('#deleteBtn')
    .addEventListener('click', delButtonHandler);
  