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
    <div className="container mx-auto">
      <div className="flex">
        <div className="rounded-lg mb-3 p-2 font-bold flex flex-row bg-blue-100 text-blue-600 flex-none">
          <Icon path={mdiAlertCircle} size={0.8} className="m-1" />
          <div className="m-1 flex-1 align-middle text-sm">一切內容以官網為準！</div>
        </div>
      </div>
      {/* logo1 */}
      <div className="border rounded-lg mb-3 pb-2 shadow">
        <div className="m-2 font-bold">
          校園服務
        </div>
        <div className="grid grid-cols-5">
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiBusStop} style={iconStyle} />
              校園巴士
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiCalendarToday} style={iconStyle} />
              校曆
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiMap} style={iconStyle} />
              校園地圖
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiMapMarkerMultiple} style={iconStyle} />
              課室地圖
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiCarBrakeParking} style={iconStyle} />
              車位
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiDropbox} style={iconStyle} />
              資源借用
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiConsoleNetwork} style={iconStyle} />
              公共電腦
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiDoorClosedLock} style={iconStyle} />
              儲物箱
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiHammerWrench} style={iconStyle} />
              維修預約
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiBasketball} style={iconStyle} />
              體育預訂
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiBookshelf} style={iconStyle} />
              圖書館
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiPassport} style={iconStyle} />
              UM Pass
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiViewGridPlus} style={iconStyle} />
              更多服務
            </Link>
          </div>
        </div>
      </div>
      {/* logo2 */}
      <div className="border rounded-lg mb-3 pb-2 shadow">
        <div className="m-2 font-bold">
          課業 &amp; 發展
        </div>
        <div className="grid grid-cols-5">
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiAlphaMCircleOutline} style={iconStyle} />
              Moodle
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiDatabaseSearch} style={iconStyle} />
              選咩課
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiAbTesting} style={iconStyle} />
              ISW
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiEyePlus} style={iconStyle} />
              預選課
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiBankPlus} style={iconStyle} />
              Add Drop
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiClipboardEdit} style={iconStyle} />
              課表模擬
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiCow} style={iconStyle} />
              全人發展
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiDolphin} style={iconStyle} />
              交流
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiDiceMultiple} style={iconStyle} />
              獎學金
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiBadgeAccount} style={iconStyle} />
              證明文件
            </Link>
          </div>
        </div>
      </div>
      {/* logo3 */}
      <div className="border rounded-lg mb-3 pb-2 shadow">
        <div className="m-2 font-bold">
          生活服務
        </div>
        <div className="grid grid-cols-5">
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiCoffeeOutline} style={iconStyle} />
              澳大論壇
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiTextBoxCheck} style={iconStyle} />
              失物認領
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiCarMultiple} style={iconStyle} />
              泊車月票
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiHumanDolly} style={iconStyle} />
              職位空缺
            </Link>
          </div>
        </div>
      </div>
      {/* logo4 */}
      <div className="border rounded-lg mb-3 pb-2 shadow">
        <div className="m-2 font-bold">
          新生推薦
        </div>
        <div className="grid grid-cols-5">
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiGhost} style={iconStyle} />
              生存指南
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiBagSuitcase} style={iconStyle} />
              內地生
            </Link>
          </div>
          <div className="text-center mb-2 text-sm">
            <Link to="">
              <Icon path={mdiAccountHeart} style={iconStyle} />
              圖文包
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
