export const scrollItems = [
  {id: 0, type: 'all', title: 'All', isSelected: true},
  {id: 1, type: 'foods', title: 'Foods', isSelected: false},
  {id: 2, type: 'drinks', title: 'Drinks', isSelected: false},
  {id: 3, type: 'snacks', title: 'Snacks', isSelected: false},
  {id: 4, type: 'sauce', title: 'Sauce', isSelected: false},
];

export const handleSelected = (_id, setMainData) => {
  let tempObj = [...scrollItems] || [];
  tempObj?.map((item, _index) => {
    if (item?.id === _id) {
      item.isSelected = true;
      return {...item, isSelected: true};
    } else {
      item.isSelected = false;
      return {...item, isSelected: false};
    }
  });
  setMainData(tempObj);
};
