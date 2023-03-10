const newCommentHandler = async (event) => {
    event.preventDefault();
  console.log("success!")
    const comment = document.querySelector('#comment').value.trim();
   
  
    if (comment) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({ comment }),
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