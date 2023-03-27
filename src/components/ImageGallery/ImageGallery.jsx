import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import { Gallery, Sorry } from './ImageGallery.styled';
import { BtnLoadMore } from '../BtnLoadMore/BtnLoadMore';
import { Audio } from 'react-loader-spinner';
import { getImages } from 'Services/imageSevice';

export class ImageGallery extends Component {
  state = {
    hits: [],
    isLoading: false,
    modalOpen: false,
    page: 1,
    pagesQuantity: 1,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevValue = prevProps.inputValue;
    const nextValue = this.props.inputValue;
    console.log(prevValue);
    console.log(nextValue);

    if (prevValue !== nextValue) {
      try {
        this.setState({ status: 'pending' });
        const response = await getImages(nextValue, this.state.page);
        const data = response.data.hits;

        this.setState({
          hits: data,
          status: 'response',
          pagesQuantity: response.data.total / 12,
          inputValue: nextValue,
        });
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    } else if (prevState.page !== this.state.page && this.state.page > 1) {
      const response = await getImages(nextValue, this.state.page);
      const data = response.data.hits;
      this.setState({ hits: [...prevState.hits, ...data] });
    }
  }

  handleClickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { hits, pagesQuantity, status } = this.state;
    if (status === 'idle') {
      return <Sorry>Hi! Please enter your request!</Sorry>;
    }
    if (status === 'pending') {
      return (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
        />
      );
    }
    if (status === 'response') {
      return (
        <>
          <Gallery>
            {hits.map(({ id, webformatURL, tags, largeImageURL }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  image={webformatURL}
                  alt={tags}
                  largeImage={largeImageURL}
                />
              );
            })}
          </Gallery>
          {pagesQuantity > 1 && (
            <BtnLoadMore onClick={this.handleClickLoadMore} />
          )}
        </>
      );
    }
    if (status === 'rejected') {
      return <Sorry>Sorry but we dont find image for you :(</Sorry>;
    }
  }
}
