import Item from './Item'
import './Queue.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export default function Queue(props){
    const dispatch = useDispatch();
    const redState = useSelector(state => state)
    const {queue} = redState
    return(
        <div className = "search-list">
            {queue.length !== 0 && <div className = "category">
                <p className = "category-heading">Queue</p>
                {
                    queue.map((item) => {
                        return(
                            <Item item = {item} type="m" />
                        )
                    })
                }
            </div>}
            {
                queue.length == 0 && <div style={{textAlign: 'center'}}><p className = "category-heading">No items in queue</p></div>
            }
        </div>
    )
}