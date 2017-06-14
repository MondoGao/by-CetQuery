import React from 'react'

import styles from './App.scss'

class App extends React.Component {
  state = {
    status: 1,
    data: {
      name: 'test',
      number: '29384728374827'
    }
  }
  
  eles = {
    header: [
      ['请认真', <br/>, '填写信息！'],
      ['你的信息', <br/>, '已经被爱闹', <br/>, '记在心里了（羞羞）']
    ],
    main: [
      <EditInfo/>,
      [
        <p>
          考号：<span>934892843289</span>
        </p>,
        <p>
          姓名：<span>爱闹</span>
        </p>,
        <p>
          “别忘了回来查看成绩哦”
        </p>
      ],
      [
        '考号：',
        '姓名：'
      ]
    ],
    footer: [
      [
        <Button isLong isOnly>保存信息</Button>
      ]
    ]
  }
  
  getEl = key => {
    return this.eles[key][this.state.status - 1]
  }
  
  render() {
    return (
      <div>
        <h2 className={styles.header}>
          {this.getEl('header')}
        </h2>
        <article className={styles.main}>
          {this.getEl('main')}
        </article>
        <div className={styles.footer}>
          {this.getEl('footer')}
        </div>
      </div>
    )
  }
}

class EditInfo extends React.Component {
  state = {
    number: '',
    name: ''
  }
  
  handleChange = key => e => {
    this.setState({
      [key]: e.target.value
    })
  }
  
  render() {
    return (
      <div>
        <Input value={this.state.number} label="考号：" handleChange={this.handleChange('number')}/>
        <Input value={this.state.name} label="姓名：" handleChange={this.handleChange('name')}/>
      </div>
    )
  }
}

const Input = ({ value, handleChange, label }) => {
  return (
    <p className={styles['input-wrapper']}>
      <label>{label}</label>
      <input type="text" value={value} onChange={handleChange}/>
    </p>
  )
}

const Button = ({ handleClick, isLong, isOnly, children }) => {
  return (
    <span
      className={`${styles.btn} ${isLong ? styles.long : ''} ${isOnly ? styles.only : ''}`}
      onClick={handleClick}
    >
      {children}
    </span>
  )
}

export default App