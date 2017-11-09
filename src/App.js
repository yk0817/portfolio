import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { photos: [] };
  }

  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));

    // get first picture set
    fetch('/photos')
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({ photos: responseJSON });
      });
  }

  // so called infinite scroll
  handleScroll(e) {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      const from = this.state.photos.length;
      fetch(`/photos?from=${from}`)
        .then(response => response.json())
        .then(responseJSON => {
          this.setState({
            photos: this.state.photos.concat(responseJSON)
          });
        });
    }
  }

  // uploads new picture with label
  uploadNew(e) {
    e.preventDefault();

    const data = new FormData(document.forms[0]);
    data.append('label', document.querySelector('#photoLabel').value);

    fetch('/photos', {
      method: 'POST',
      body: data
    });
  }

  // load random picture
  showRandom() {
    fetch('/photos/random')
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({ photos: [responseJSON] });
      });
  }

  render() {

    const photos = this.state.photos.map( photo => {
      return (
        <div key={photo.id} className="tile">
          <img src={'http://' + photo.url} alt={photo.label} />
          <div className="label">{photo.label}</div>
        </div>
      )
    });

    return (
      <div className="App">
        <h1>Портфолио</h1>
        <form action="/photos" method="post">
          <p>Загрузить новое фото</p>
          <input id="photoLabel" type="text" placeholder="Наименование изображения" />
          <input id="fileupload" type="file" name="fancyPhoto" />
          <button onClick={ (e) => {this.uploadNew(e)}}>Загрузить фотографию</button>
        </form>
        <div className="actions">
          <button onClick={ (e) => {this.showRandom(e)}}>Покажите мне случайное изображение</button>
        </div>
        <div className="tiles">{photos}</div>
      </div>
    )

  }
}
