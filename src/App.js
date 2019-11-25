import React, { useState } from 'react';
import ZipForm from './components/ZipForm';
import getCountry from './utils/getCountry';
import './App.css';
import 'antd/dist/antd.css';
import { message, List } from 'antd';

function App() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  function listItemClick(index) {
    return function(e) {
      const newList = [...list].map(el => ({ ...el, active: false }));
      newList[index].active = !list[index].active;
      if(newList[index].active) {
        setValue(newList[index]['post code']);
      }
      setList(newList);
    }
  }

  const submit = (value) => {
    if(list.some(el => el['post code'] === value)) {
      return;
    }
    setLoading(true);
    getCountry(value)
      .then(
        res => {
          if(res.status === 404) {
            return Promise.reject(new Error(`This zip ${value} code is not found!`));
          }
          return res.json();
        }
      )
      .then(
        res => {
          const activeIndex = list.findIndex(el => el.active === true);
          let newList = [...list, res];
          if(activeIndex > -1) {
            newList = [...list];
            newList[activeIndex] = res;
          }
          return newList;
        }
      )
      .then(res => setList(res))
      .then(res => setLoading(false))
      .catch(
        err => {
          message.error(err.message);
          setLoading(false);
        }
      )
  }
  return (
    <div className="App">
      <ZipForm onSubmit={submit} loading={loading} value={value} />
      <List
        bordered
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item onClick={listItemClick(index)} className={item.active ? 'selected' : ''}>
            {item['places'][0]['place name']}, {item['country abbreviation']}
          </List.Item>
        )}
      />
    </div>
  );
}

export default App;
