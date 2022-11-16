import React, { Component } from 'react';
import Arrow from '../header/Arrow';
import styles from './drop.module.css';
import { Option, OptionMenu, SelectBtn, List } from './dropStyles';

class Dropdown extends Component {
  DropdownD = () => {
    const caret = document.querySelector('#caaret');
    const optionMenu = document.querySelector('#menu');

    const options = document.querySelectorAll('.option');
    const sBtnText = document.querySelector('.sBtn-text');

    optionMenu.classList.toggle('active');
    caret.classList.toggle('caret-rotate');

    options.forEach((option) => {
      option.addEventListener('click', () => {
        const selected = option.querySelector('.optionText').innerText;
        sBtnText.innerText = selected;
      });
    });
  };

  render() {
    return (
      <OptionMenu className='Menu' onClick={this.DropdownD}>
        <SelectBtn className='selectBBtn'>
          <span className='sBtn-text'>&</span>
          <span className={styles.chevron} id='caaret'>
            <Arrow />
          </span>
        </SelectBtn>
        <List id='menu'>
          <Option className='option'>
            <span className={styles.icon}>
              {' '}
              <Arrow />
            </span>
            <span className='optionText'>USD</span>
          </Option>
          <Option className='option'>
            <span className={styles.icon}>
              {' '}
              <Arrow />
            </span>
            <span className='optionText'>Mtn</span>
          </Option>
          <Option className='option'>
            <span className={styles.icon}>
              {' '}
              <Arrow />
            </span>
            <span className='optionText'>Glo</span>
          </Option>
          <Option className='option'>
            <span className={styles.icon}>
              {' '}
              <Arrow />
            </span>
            <span className='optionText'>Airtel</span>
          </Option>
        </List>
      </OptionMenu>
    );
  }
}

export default Dropdown;
