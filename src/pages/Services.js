import {Link} from "react-router-dom";

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

export default function Services() {
  return (
    <div className="container mx-atuo">
      <h1>Services</h1>
      <div className="grid grid-cols-5">
        <div>
          <Link to="/campus-loop">
          <Icon path={mdiBusStop} size={1} />
          校園巴士
          </Link>
        </div>
        <div>
          <Icon path={mdiCalendarToday} size={1} />
          校曆
        </div>
        <div>
          <Icon path={mdiMap} size={1} />
          校園地圖
        </div>
        <div>
          <Icon path={mdiMapMarkerMultiple} size={1} />
          課室地圖
        </div>
        <div>
          <Icon path={mdiCarBrakeParking} size={1} />
          車位
        </div>
        <div>
          <Icon path={mdiDropbox} size={1} />
          資源借用
        </div>
        <div>
          <Icon path={mdiConsoleNetwork} size={1} />
          公共電腦
        </div>
        <div>
          <Icon path={mdiDoorClosedLock} size={1} />
          儲物箱
        </div>
        <div>
          <Icon path={mdiHammerWrench} size={1} />
          維修預約
        </div>
        <div>
          <Icon path={mdiBasketball} size={1} />
          體育預訂
        </div>
        <div>
          <Icon path={mdiBookshelf} size={1} />
          圖書館
        </div>
        <div>
          <Icon path={mdiPassport} size={1} />
          UM Pass
        </div>
        <div>
          <Icon path={mdiViewGridPlus} size={1} />
          更多服務
        </div>
      </div>
    </div>
  );
}
