import { BtnLoad } from './BtnLoadMore.styled';

export const BtnLoadMore = ({ onClick }) => {
  return (
    <BtnLoad type="button" onClick={onClick}>
      Load More
    </BtnLoad>
  );
};
