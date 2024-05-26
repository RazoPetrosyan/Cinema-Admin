import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck, faFloppyDisk, faPen, faPlus, faXmark, faTrash, faCheckDouble,
} from '@fortawesome/free-solid-svg-icons';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { categoryList } from '../../../../store/actions/categoryList';
import { createCategory } from '../../../../store/actions/createCategory';
import { deleteCategory } from '../../../../store/actions/deleteCategory';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  height: '100%',
  bgcolor: '#000',
  border: '4px solid #135F55',
  outline: 'none',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '50px',
};

function Category(props) {
  const { selectedCategories, setSelectedCategories } = props;
  const [open, setOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryList.list);

  useEffect(() => {
    dispatch(categoryList());
  }, [dispatch]);

  const handleAddCategory = useCallback(() => {
    dispatch(createCategory({ name: newCategoryName }));
    setNewCategoryName('');
  }, [dispatch, newCategoryName]);

  const handleDeleteCategory = useCallback((categoryId) => {
    dispatch(deleteCategory(categoryId));
  }, [dispatch]);

  const toggleCategorySelection = useCallback((categoryId) => {
    const categoryIdString = categoryId.toString();
    if (selectedCategories.includes(categoryIdString)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryIdString));
    } else {
      setSelectedCategories([...selectedCategories, categoryIdString]);
    }
  }, [selectedCategories]);

  return (
    <div className="modal__category">
      <Button onClick={handleOpen}>
        Select Categories For Movie
        <FontAwesomeIcon icon={faCheckDouble} />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="modal__category__close">
            <FontAwesomeIcon onClick={handleClose} icon={faXmark} />
          </div>
          <div className="admin__movie__section__content__cat">
            <div className="admin__movie__section__content__cat__first">
              <div className="admin__movie__section__content__cat__first__input">
                <input
                  type="text"
                  placeholder="Name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <FontAwesomeIcon icon={faCheck} onClick={handleAddCategory} />
              </div>
              <div className="admin__movie__section__content__cat__first__icon">
                <FontAwesomeIcon icon={faPen} />
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </div>
            <div className="admin__movie__section__content__cat__list">
              {categories && categories.map((category) => (
                <div key={category.id} onClick={() => toggleCategorySelection(category.id)}>
                  <p>{category.name}</p>
                  {selectedCategories.includes(category.id.toString())
                    && <FontAwesomeIcon icon={faCheck} />}
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDeleteCategory(category.id)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="modal__category__save">
            <FontAwesomeIcon onClick={handleClose} icon={faFloppyDisk} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Category;