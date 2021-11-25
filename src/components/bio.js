import { Link } from "gatsby"
import _ from "lodash"
import React from "react"
import styles from "./bio.module.scss"
import Moment from 'moment'

const Bio = ({ date, author, pinned, readingTime, lastUpdated }) => {
  Moment.locale('en');
  const lastUpdatedDate = Moment(lastUpdated).format("MMMM, DD YYYY")
  const githubUrl = author.github
    ? `https://github.com/${author.github}.png?size=50`
    : `https://ui-avatars.com/api/?name=${author.id}&size=460`
  return (
    <div className={`${styles.bio} d-flex ${pinned ? styles.pinned : ""}`}>
      <div>
        <img className={`circle large`} src={githubUrl} alt={author.id} />
      </div>
      <div className="text ml-sm">
        <Link to={`/author/${_.kebabCase(author.id)}/`}>
          <strong>{author.id}</strong>
        </Link>
        <div className={styles.dateWrap}>
          <div className={styles.date}>{date}</div>
          <div className={styles.time}>{readingTime}</div>
          <br/>
          {/* <div className={styles.lastUpdated}> Last Updated at: {lastUpdatedDate}</div> */}
        </div>
      </div>
      
    </div>
  )
}

export default Bio
