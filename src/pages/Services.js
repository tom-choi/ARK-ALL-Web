import { Link } from "react-router-dom";

import Icon from '@mdi/react'
import { mdiBusStop } from '@mdi/js'
import { mdiCalendarToday } from '@mdi/js'
import { mdiMap } from '@mdi/js'
import { mdiMapMarkerMultiple } from '@mdi/js'
import { mdiCarBrakeParking } from '@mdi/js'
import { mdiDropbox } from '@mdi/js'
import { mdiConsoleNetwork } from '@mdi/js'
import { mdiDoorClosedLock } from '@mdi/js'
import { mdiHammerWrench } from '@mdi/js'
import { mdiBasketball } from '@mdi/js'
import { mdiBookshelf } from '@mdi/js'
import { mdiPassport } from '@mdi/js'
import { mdiViewGridPlus } from '@mdi/js'
import { mdiAlphaMCircleOutline } from '@mdi/js'
import { mdiDatabaseSearch } from '@mdi/js'
import { mdiAbTesting } from '@mdi/js'
import { mdiEyePlus } from '@mdi/js'
import { mdiBankPlus } from '@mdi/js'
import { mdiClipboardEdit } from '@mdi/js'
import { mdiCow } from '@mdi/js'
import { mdiDolphin } from '@mdi/js'
import { mdiDiceMultiple } from '@mdi/js'
import { mdiBadgeAccount } from '@mdi/js'
import { mdiCoffeeOutline } from '@mdi/js'
import { mdiTextBoxCheck } from '@mdi/js'
import { mdiCarMultiple } from '@mdi/js'
import { mdiHumanDolly } from '@mdi/js'
import { mdiGhost } from '@mdi/js'
import { mdiBagSuitcase } from '@mdi/js'
import { mdiAccountHeart } from '@mdi/js'

import { mdiAlertCircle } from '@mdi/js'

import { color } from '../utils/uiMap'

export default function Services() {
  const iconStyle = {
    color: color.theme,
    width: "2rem",
    height: "2rem",
    marginLeft: "auto",
    marginRight: "auto",
  }
  return (
    <div className="m-1">
      <div className="flex">
        <div className="rounded-lg mb-3 p-2 font-bold flex flex-row bg-blue-100 text-blue-600 flex-none">
          <Icon path={mdiAlertCircle} size={0.8} className="m-1" />
          <div className="m-1 flex-1 align-middle text-sm">一切內容以官網為準！</div>
        </div>
      </div>
      {/* logo1 */}
      <div className="border bg-white rounded-lg mb-3 pb-2 shadow">
        <div className="m-2 font-bold">
          校園服務
        </div>
        <div className="grid grid-cols-5">
          <div className="text-center mb-2 text-sm">
            <Link to="/campus-loop">
              <Icon path={mdiBusStop} style={iconStyle} />
              校園巴士
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="https://reg.um.edu.mo/university-almanac/?lang=zh-hant" target="_blank" rel="noreferrer">
              <Icon path={mdiCalendarToday} style={iconStyle} />
              校曆
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="https://maps.um.edu.mo" target="_blank" rel="noreferrer">
              <Icon path={mdiMap} style={iconStyle} />
              校園地圖
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="https://isw.um.edu.mo/umclassroom/" target="_blank" rel="noreferrer">
              <Icon path={mdiMapMarkerMultiple} style={iconStyle} />
              課室地圖
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiCarBrakeParking} style={iconStyle} />
              車位
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiDropbox} style={iconStyle} />
              資源借用
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiConsoleNetwork} style={iconStyle} />
              公共電腦
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiDoorClosedLock} style={iconStyle} />
              儲物箱
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiHammerWrench} style={iconStyle} />
              維修預約
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiBasketball} style={iconStyle} />
              體育預訂
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiBookshelf} style={iconStyle} />
              圖書館
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiPassport} style={iconStyle} />
              UM Pass
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiViewGridPlus} style={iconStyle} />
              更多服務
            </a>
          </div>
        </div>
      </div>
      {/* logo2 */}
      <div className="border bg-white rounded-lg mb-3 pb-2 shadow">
        <div className="m-2 font-bold">
          課業 &amp; 發展
        </div>
        <div className="grid grid-cols-5">
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiAlphaMCircleOutline} style={iconStyle} />
              Moodle
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiDatabaseSearch} style={iconStyle} />
              選咩課
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiAbTesting} style={iconStyle} />
              ISW
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiEyePlus} style={iconStyle} />
              預選課
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiBankPlus} style={iconStyle} />
              Add Drop
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiClipboardEdit} style={iconStyle} />
              課表模擬
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiCow} style={iconStyle} />
              全人發展
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiDolphin} style={iconStyle} />
              交流
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiDiceMultiple} style={iconStyle} />
              獎學金
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiBadgeAccount} style={iconStyle} />
              證明文件
            </a>
          </div>
        </div>
      </div>
      {/* logo3 */}
      <div className="border bg-white rounded-lg mb-3 pb-2 shadow">
        <div className="m-2 font-bold">
          生活服務
        </div>
        <div className="grid grid-cols-5">
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiCoffeeOutline} style={iconStyle} />
              澳大論壇
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiTextBoxCheck} style={iconStyle} />
              失物認領
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiCarMultiple} style={iconStyle} />
              泊車月票
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiHumanDolly} style={iconStyle} />
              職位空缺
            </a>
          </div>
        </div>
      </div>
      {/* logo4 */}
      <div className="border bg-white rounded-lg mb-3 pb-2 shadow">
        <div className="m-2 font-bold">
          新生推薦
        </div>
        <div className="grid grid-cols-5">
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiGhost} style={iconStyle} />
              生存指南
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiBagSuitcase} style={iconStyle} />
              內地生
            </a>
          </div>
          <div className="text-center mb-2 text-sm">
            <a href="" target="_blank" rel="noreferrer">
              <Icon path={mdiAccountHeart} style={iconStyle} />
              圖文包
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
