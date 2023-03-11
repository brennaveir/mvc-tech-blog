const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#blogpost-name').value.trim();
    const content = document.querySelector('#blogpost-content').value.trim();
  
    if (name && content) {
      const response = await fetch(`/api/blogpost`, {
        method: 'POST',
        body: JSON.stringify({ name, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/blogpost');
      } else {
        alert('Failed to create blogpost');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blogpost/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-blogpost-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.blogpost-list')
    .addEventListener('click', delButtonHandler);
  