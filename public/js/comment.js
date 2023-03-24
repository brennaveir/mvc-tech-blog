const updateBtns = document.querySelectorAll('[id=updateForm]');
const submitUpdatedBlogBtns = document.querySelectorAll(
  '[id=updateBtn]'
);
const delBtns = document.querySelectorAll('[id=deleteBtn]')

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

  function updateCommentButton(event) {
    const id = event.target.getAttribute('update-id');
    const showForm = document.getElementById(`update-form-${id}`)
    showForm.classList.remove('d-none')
    
  }
  
  
  const updateCommentHandler = async (event) => {
    event.preventDefault()
    console.log("clicked")
  
    if (event.target.hasAttribute('update-id')) {
      const id = event.target.getAttribute('update-id');
      const text = document.querySelector(`#update-comment-text-${id}`).value.trim()
      
      console.log(text)
      const response = await fetch(`/api/comment/${id}`, {
        method: 'PUT',
  
        body: JSON.stringify({
          text
        }),
        headers: { 'content-type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to update comment');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    console.log("clicked")
    event.preventDefault()
    if (event.target.hasAttribute('delete-id')) {
      const id = event.target.getAttribute('delete-id');
  
      const response = await fetch(`/api/comment/${id}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        console.log(response)
        alert('Failed to delete comment');
      }
    }
  };  


document
  .querySelector('#new-comment-btn')
  .addEventListener('click', newCommentHandler);

  updateBtns.forEach((el) => el.addEventListener('click', updateCommentButton));
submitUpdatedBlogBtns.forEach((el) =>
  el.addEventListener('click', updateCommentHandler)
);

delBtns.forEach((el) => el.addEventListener('click', delButtonHandler))


  