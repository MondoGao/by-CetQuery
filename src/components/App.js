import React from 'react'

import styles from './App.scss'
import * as sources from 'sources'

class App extends React.Component {
  state = {
    isLoading: true,
    status: 1,
    data: {
      code: '',
      name: ''
    }
  }
  
  toggleLoading = (isLoading = true) => {
    this.setState({
      isLoading
    })
  }
  
  handleBtnClick = (isNext = true) => e => {
    switch (this.state.status) {
      case 1:
        this.toggleLoading()
        sources.postAdd(this.state.data.code, this.state.data.name)
          .then(() => {
            this.setState({
              isLoading: false,
              status: 2
            })
          })
        break;
      case 2:
      case 3:
        if (isNext) {
          this.toggleLoading()
          sources.getCet()
            .then(data => {
              this.setState(prevState => ({
                isLoading: false,
                status: 4,
                data: {
                  ...prevState.data,
                  ...data.data
                }
              }))
            })
        } else {
          this.setState({
            status: 1
          })
        }
        break;
      case 4:
        this.setState({
          status: 3
        })
        break;
    }
  }
  
  handleChange = key => e => {
    this.setState({
      data: {
        ...this.state.data,
        [key]: e.target.value
      }
    })
  }
  
  eles = () => ({
    header: [
      ['请认真', <br/>, '填写信息！'],
      ['你的信息', <br/>, '已经被爱闹', <br/>, '记在心里了（羞羞'],
      ['你被爱闹', <br/>, '保存的信息！'],
      [`${this.state.data.name}同学`, <br/>, `你的${this.state.data.level > 5 ? '六' : '四'}级分数：`]
    ],
    main: [
      <EditInfo handleChange={this.handleChange}/>,
      [
        <p>
          考号：<span>{this.state.data.number}</span>
        </p>,
        <p>
          姓名：<span>{this.state.data.name}</span>
        </p>,
        <br/>,
        <p>
          “别忘了回来查看成绩哦”
        </p>
      ],
      [
        <p>
          考号：<span>{this.state.data.number}</span>
        </p>,
        <p>
          姓名：<span>{this.state.data.name}</span>
        </p>
      ],
      [
        <p className={styles.score}>
          总分：{this.state.data.score}
        </p>,
        <br/>,
        <p>
          听力：{this.state.data.listen}
        </p>,
        <p>
          阅读：{this.state.data.reading}
        </p>,
        <p>
          写作和翻译：{this.state.data.writing}
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
  
  componentDidMount() {
    sources.getQuery()
      .then(data => {
        if (data.data) {
          this.setState({
            isLoading: false,
            status: 3,
            data: {
              ...this.state.data,
              ...data.data
            }
          })
        } else {
          this.setState({
            status: 1
          })
        }
      })
      .catch(err => {
        if (err.data && err.data.status == 100) {
          alert('别太着急啦~成绩还没出哦~')
        }
      })
  }
  
  render() {
    if (!~this.state.status ||this.state.isLoading) {
      return (
        <div>
          <h2 className={styles.header}>
            加载中...
          </h2>
        </div>
      )
    }
    
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
  render() {
    return (
      <div>
        <Input value={this.props.number} label="考号：" handleChange={this.props.handleChange('code')}/>
        <Input value={this.props.name} label="姓名：" handleChange={this.props.handleChange('name')}/>
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