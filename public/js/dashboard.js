
const updateBtns = document.querySelectorAll('[id=updateBtn]');
const submitUpdatedBlogBtns = document.querySelectorAll(
  '[id=updateBtn]'
);

const newPostHandler = async (event) => {
  event.preventDefault();
  console.log("create clicked")
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



function updateFormHandler() {
  document.getElementById("update-form").style.display = 'flex'
}


const updateButtonHandler = async (event) => {
  event.preventDefault()
  console.log("clicked")

  if (event.target.hasAttribute('data-id')) {
    const title = document.querySelector('#update-title').value
    const contents = document.querySelector("#update-contents").value
    const id = event.target.getAttribute('data-id');
    console.log(id)
    const response = await fetch(`api/blogpost/${id}`, {
      method: 'PUT',

      body: JSON.stringify({
        title,
        contents
      }),
      headers: { 'content-type': 'application/json' },
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
  if (event.target.hasAttribute('delete-id')) {
    const id = event.target.getAttribute('delete-id');

    const response = await fetch(`api/blogpost/${id}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      console.log(response)
      alert('Failed to delete project');
    }
  }
};
updateBtns.forEach((el) => el.addEventListener('click', updateFormHandler));
submitUpdatedBlogBtns.forEach((el) =>
  el.addEventListener('click', updateButtonHandler)
);

document
.getElementById('updateForm')
.addEventListener('click', updateFormHandler)

document
  .querySelector('.new-blogpost-form')
  .addEventListener('submit', newPostHandler);




  


document
  .querySelector('.blogpost-list')
  .addEventListener('click', delButtonHandler);
