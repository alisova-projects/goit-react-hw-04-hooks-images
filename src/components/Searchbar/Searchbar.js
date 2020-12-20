// import { Component } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Gallery({ onSubmit }) {
  const [pictureName, setPictureName] = useState('');

  const handleNameChange = e => {
    setPictureName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (pictureName.trim() === '') {
      return toast.error('Введите название картинки');
    }
    onSubmit(pictureName);
    setPictureName('');
  };

  return (
    <header onSubmit={handleSubmit} className="Searchbar">
      <form className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          value={pictureName}
          onChange={handleNameChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

// class Gallery extends Component {
//   state = {
//     pictureName: '',
//   };

//   handleNameChange = e => {
//     this.setState({ pictureName: e.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     if (this.state.pictureName.trim() === '') {
//       return toast.error('Введите название картинки');
//     }
//     this.props.onSubmit(this.state.pictureName);
//     this.setState({ pictureName: '' });
//   };

//   render() {
//     return (
//       <header onSubmit={this.handleSubmit} className="Searchbar">
//         <form className="SearchForm">
//           <button type="submit" className="SearchForm-button">
//             <span className="SearchForm-button-label">Search</span>
//           </button>

//           <input
//             className="SearchForm-input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             value={this.state.pictureName}
//             onChange={this.handleNameChange}
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }

// export default Gallery;
