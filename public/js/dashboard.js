const newFormHandler = async (event) => {
  event.preventDefault();
  const id = event.target.getAttribute('id');

  const title = document.querySelector('#blog-title').value.trim();
  const description = document.querySelector('#blog-desc').value.trim();

  if (title && description) {
    const response = await fetch(`/api/blogs/${id ?? ''}`, {

      method: id ? 'PUT' : 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create new blog post');
    }
  }
};

const updateButtonHandler = async (event) => {
  if (event.target.hasAttribute('update')) {
    const id = event.target.getAttribute('update');

    const response = await fetch(`/api/blogs/${id}`);
    if (!response.ok) {
      alert('Failed to retrieve blog post for editing');
      return;
    }
    const blogData = await response.json();
    document.querySelector('#blog-title').value = blogData.title;
    document.querySelector('#blog-desc').value = blogData.description;
    document.querySelector('#edit').textContent = 'Update';
    document.querySelector('.new-blog-form').setAttribute('id', id)
  };
}

const deleteButtonHandler = async (event) => {
  if (event.target.hasAttribute('delete')) {
    const id = event.target.getAttribute('delete');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog post');
    }
  }
};

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.blog-list')
  .addEventListener('click', updateButtonHandler);

document
  .querySelector('.blog-list')
  .addEventListener('click', deleteButtonHandler);