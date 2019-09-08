import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
})

const LinearDeterminate = props => {
  const percentComplete = props.percent
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <br />
      {console.log(percentComplete)}
      <h1>{props.name}</h1>
      <LinearProgress variant="determinate" value={percentComplete} />
    </div>
  )
}

export default LinearDeterminate
