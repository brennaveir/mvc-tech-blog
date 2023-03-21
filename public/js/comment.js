const newCommentHandler = async (event) => {
    event.preventDefault();
  console.log("success!")
    const text = document.querySelector('#comment').value.trim();
   const blogpost_id = document.querySelector('.blog-id').getAttribute("id")
  
    if (text) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({ text, blogpost_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to post comment');
      }
    }
  };

      
 function updateFormHandler () {
  document.getElementById("update-comment").style.display = 'flex'
 } 
  
    
  const updateButtonHandler = async (event) => {
    event.preventDefault()
    console.log("clicked")
    
    if (event.target.hasAttribute('data-id')) {
const text = document.querySelector('#update-text').value

      const id = event.target.getAttribute('data-id');
      console.log(id)
      const response = await fetch(`api/comment/${id}`, {
        method: 'PUT', 
        
        body: JSON.stringify({
          text
        }),
        headers: { 'content-type': 'application/json'},
      });
  
      if (response.ok) {
        document.location.reload()
      } else {
        alert('Failed to update comment');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    console.log("clicked")
    event.preventDefault()
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
     
      const response = await fetch(`api/comment/${id}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json'}
      });
  
      if (response.ok) {
        document.location.reload()
      } else {
        console.log(response)
        alert('Failed to delete project');
      }
    }
  };

  document
  .querySelector('.new-comment')
  .addEventListener('submit', newCommentHandler);

  document
    .querySelector('#update-comment-form')
    .addEventListener('click', updateFormHandler)
    
    document
    .querySelector('#updateBtn')
    .addEventListener('click', updateButtonHandler)

  
  document
    .querySelector('#deleteBtn')
    .addEventListener('click', delButtonHandler);
  