import { useEffect } from "react"
import "./Connect4.css"
import { load } from "./cross-script"
import { PlayerSelects } from "../PlayerSelects"

export function Connect4() {
  useEffect(()=>{
    load()
  },[])
  return (
    <div>
      <PlayerSelects></PlayerSelects>
      <br />
      <br />
      <table>
        <tbody>

          <tr id="row-1">
            <td id="row-1-col-1"></td>
            <td id="row-1-col-2"></td>
            <td id="row-1-col-3"></td>
            <td id="row-1-col-4"></td>
            <td id="row-1-col-5"></td>
            <td id="row-1-col-6"></td>
            <td id="row-1-col-7"></td>
          </tr>
          <tr id="row-2">
            <td id="row-2-col-1"></td>
            <td id="row-2-col-2"></td>
            <td id="row-2-col-3"></td>
            <td id="row-2-col-4"></td>
            <td id="row-2-col-5"></td>
            <td id="row-2-col-6"></td>
            <td id="row-2-col-7"></td>
          </tr>
          <tr id="row-3">
            <td id="row-3-col-1"></td>
            <td id="row-3-col-2"></td>
            <td id="row-3-col-3"></td>
            <td id="row-3-col-4"></td>
            <td id="row-3-col-5"></td>
            <td id="row-3-col-6"></td>
            <td id="row-3-col-7"></td>
          </tr>
          <tr id="row-4">
            <td id="row-4-col-1"></td>
            <td id="row-4-col-2"></td>
            <td id="row-4-col-3"></td>
            <td id="row-4-col-4"></td>
            <td id="row-4-col-5"></td>
            <td id="row-4-col-6"></td>
            <td id="row-4-col-7"></td>
          </tr>
          <tr id="row-5">
            <td id="row-5-col-1"></td>
            <td id="row-5-col-2"></td>
            <td id="row-5-col-3"></td>
            <td id="row-5-col-4"></td>
            <td id="row-5-col-5"></td>
            <td id="row-5-col-6"></td>
            <td id="row-5-col-7"></td>
          </tr>
          <tr id="row-6">
            <td id="row-6-col-1"></td>
            <td id="row-6-col-2"></td>
            <td id="row-6-col-3"></td>
            <td id="row-6-col-4"></td>
            <td id="row-6-col-5"></td>
            <td id="row-6-col-6"></td>
            <td id="row-6-col-7"></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}