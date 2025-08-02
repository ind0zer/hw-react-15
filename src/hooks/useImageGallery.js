import { useReducer, useCallback, useMemo } from 'react';

const initialState = {
  query: '',
  images: [],
  page: 1,
  isLoading: false,
  showModal: false,
  largeImageURL: '',
};

const actionTypes = {
  SET_QUERY: 'SET_QUERY',
  SET_IMAGES: 'SET_IMAGES',
  ADD_IMAGES: 'ADD_IMAGES',
  SET_PAGE: 'SET_PAGE',
  SET_LOADING: 'SET_LOADING',
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
  RESET_SEARCH: 'RESET_SEARCH',
};

const imageGalleryReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_QUERY:
      return {
        ...state,
        query: action.payload,
        page: 1,
        images: [],
      };
    case actionTypes.SET_IMAGES:
      return {
        ...state,
        images: action.payload,
      };
    case actionTypes.ADD_IMAGES:
      return {
        ...state,
        images: [...state.images, ...action.payload],
      };
    case actionTypes.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case actionTypes.SHOW_MODAL:
      return {
        ...state,
        showModal: true,
        largeImageURL: action.payload,
      };
    case actionTypes.HIDE_MODAL:
      return {
        ...state,
        showModal: false,
        largeImageURL: '',
      };
    case actionTypes.RESET_SEARCH:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const useImageGallery = () => {
  const [state, dispatch] = useReducer(imageGalleryReducer, initialState);

  const setQuery = useCallback((newQuery) => {
    if (newQuery === state.query) return;
    dispatch({ type: actionTypes.SET_QUERY, payload: newQuery });
  }, [state.query]);

  const setImages = useCallback((images) => {
    dispatch({ type: actionTypes.SET_IMAGES, payload: images });
  }, []);

  const addImages = useCallback((images) => {
    dispatch({ type: actionTypes.ADD_IMAGES, payload: images });
  }, []);

  const setPage = useCallback((page) => {
    dispatch({ type: actionTypes.SET_PAGE, payload: page });
  }, []);

  const setLoading = useCallback((loading) => {
    dispatch({ type: actionTypes.SET_LOADING, payload: loading });
  }, []);

  const openModal = useCallback((imageUrl) => {
    dispatch({ type: actionTypes.SHOW_MODAL, payload: imageUrl });
  }, []);

  const closeModal = useCallback(() => {
    dispatch({ type: actionTypes.HIDE_MODAL });
  }, []);

  const loadMoreImages = useCallback(() => {
    dispatch({ type: actionTypes.SET_PAGE, payload: state.page + 1 });
  }, [state.page]);

  const resetSearch = useCallback(() => {
    dispatch({ type: actionTypes.RESET_SEARCH });
  }, []);

  const shouldShowLoadMore = useMemo(() => {
    return state.images.length > 0 && !state.isLoading;
  }, [state.images.length, state.isLoading]);

  return {
    ...state,
    setQuery,
    setImages,
    addImages,
    setPage,
    setLoading,
    openModal,
    closeModal,
    loadMoreImages,
    resetSearch,
    shouldShowLoadMore,
  };
}; 