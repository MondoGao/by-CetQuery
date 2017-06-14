import React from 'react'

import styles from './App.scss'

class App extends React.Component {
  state = {
    status: 4,
    data: {
      name: 'test',
      number: '29384728374827'
    }
  }
  
  handleBtnClick = (isNext = true) => e => {
    switch (this.state.status) {
      case 1:
        this.setState({
          status: 2
        })
        break;
      case 2:
      case 3:
        this.setState({
          status: isNext ? 4 : 1
        })
        break;
      case 4:
        this.setState({
          status: 3
        })
        break;
    }
  }
  
  eles = () => ({
    header: [
      ['请认真', <br/>, '填写信息！'],
      ['你的信息', <br/>, '已经被爱闹', <br/>, '记在心里了（羞羞'],
      ['你被爱闹', <br/>, '保存的信息！'],
      [`${this.state.data.name}同学`, <br/>, '你的四级分数：']
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
        <br/>,
        <p>
          “别忘了回来查看成绩哦”
        </p>
      ],
      [
        <p>
          考号：<span>02398490284938</span>
        </p>,
        <p>
          姓名：<span>爱闹</span>
        </p>
      ],
      [
        <p className={styles.score}>
          总分：xxx
        </p>,
        <br/>,
        <p>
          听力：xxx
        </p>,
        <p>
          阅读：xxx
        </p>,
        <p>
          写作和翻译：xxx
        </p>,
      ]
    ],
    footer: [
      <Button isLong isOnly handleClick={this.handleBtnClick()}>保存信息</Button>,
      [
        <Button key="retry" handleClick={this.handleBtnClick(false)}>我要重写</Button>,
        <Button key="query" handleClick={this.handleBtnClick()}>查询成绩</Button>
      ],
      [
        <Button key="retry" handleClick={this.handleBtnClick(false)}>我要重写</Button>,
        <Button key="query" handleClick={this.handleBtnClick()}>查询成绩</Button>
      ],
      <Button isLong isOnly handleClick={this.handleBtnClick()}>返回</Button>,
    ]
  })
  
  getEl = key => {
    return this.eles()[key][this.state.status - 1]
  }
  
  render() {
    return (
      <div>
        <h2 className={styles.header}>
          {this.getEl('header')}
        </h2>
        <article className={`${styles.main} ${styles[`main-${this.state.status}`]}`}>
          {this.getEl('main')}
        </article>
        <div className={styles.footer}>
          {this.getEl('footer')}
        </div>
        <footer>
          2017© Powered by Bingyan Studio
        </footer>
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