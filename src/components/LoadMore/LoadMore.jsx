import PropTypes from 'prop-types';
import { LoadMoreBtn, LoadMoreWrap } from './LoadMore.styled';

const LoadMore = ({onClick}) => {
  return (
    <LoadMoreWrap>
          <LoadMoreBtn type='button' onClick={() => onClick()}>
                Load more
          </LoadMoreBtn>
    </LoadMoreWrap>
  )
}

LoadMore.propTypes = {
  onClick: PropTypes.func,
}

export { LoadMore }