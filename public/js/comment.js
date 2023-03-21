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
        document.location.replace('/');
      } else {
        alert('Failed to post comment');
      }
    }
  };

  document
  .querySelector('.new-comment')
  .addEventListener('submit', newCommentHandler);