import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Codelog from '@/components/Codelog'
import Login from '@/components/Login'
import RankList from '@/components/RankList'
import AllClub from '@/components/AllClub'
import CreateClub from '@/components/CreateClub'
import ClubIndex from '@/components/ClubIndex'
import Invited from '@/components/Invited'
import ClubAudit from '@/components/ClubAudit'
import Members from '@/components/Members'
import Launched from '@/components/Launched'
import LaunchedShort from '@/components/LaunchedShort'
import AllActive from '@/components/AllActive'
import Evaluation from '@/components/Evaluation'
import Comment from '@/components/Comment'
import AllDynamic from '@/components/AllDynamic'
import DynamicDetail from '@/components/DynamicDetail'
import LikeList from '@/components/LikeList'
import Tribal from '@/components/Tribal'
import ActiveDetail from '@/components/ActiveDetail'
import ActiveDetailShort from '@/components/ActiveDetailShort'
import IssueActiveDetail from '@/components/IssueActiveDetail'
import LaunchedIssue from '@/components/LaunchedIssue'
import LaunchedLong from '@/components/LaunchedLong'
import MembersActive from '@/components/MembersActive'
import PlayersPage from '@/components/PlayersPage'
import SoccerHome from '@/components/SoccerHome'
import EnterpriseAudit from '@/components/EnterpriseAudit'
import MyClub from '@/components/MyClub'
import MyActive from '@/components/MyActive'
import ApplyRefund from '@/components/ApplyRefund'
import PersonalCenter from '@/components/PersonalCenter'
import BusinessInvitation from '@/components/BusinessInvitation'
import EditInformation from '@/components/EditInformation'
import DynamicReply from '@/components/DynamicReply'
import SigninActive from '@/components/SigninActive'
import NewActive from '@/components/NewActive'
import Hitcard from '@/components/Hitcard'
import HitcardAddress from '@/components/HitcardAddress'
import Paypage from '@/components/Paypage'
import ClubShare from '@/components/ClubShare'
import CommpanyShare from '@/components/CommpanyShare'
import ChangePassword from '@/components/ChangePassword'
import VideoPlayer from '@/components/VideoPlayer'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
        meta: {
            title: '俱乐部',
            keepAlive: true, // 此组件需要被缓存
            isBack:false, //用于判断上一个页面是哪个

        }

    },
    {
      path: '/codelog',
      name: 'Codelog',
      component: Codelog
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/ranklist',
      name: 'RankList',
      component: RankList
    },
    {
      path: '/allclub',
      name: 'AllClub',
      component: AllClub,
      meta: {
        keepAlive: true, // 此组件需要被缓存
        isBack:false, //用于判断上一个页面是哪个

      }
    },
    {
      path: '/createclub',
      name: 'CreateClub',
      component: CreateClub,
      meta: {
        keepAlive: false, // 此组件不需要被缓存
    }

    },

    {
      path: '/clubindex',
      name: 'ClubIndex',
      component: ClubIndex,
      meta: {
        keepAlive: true, // 此组件需要被缓存
        isBack:false, //用于判断上一个页面是哪个
    }

    },
    {
      path: '/invited',
      name: 'Invited',
      component: Invited
    },
    {
      path: '/clubaudit',
      name: 'ClubAudit',
      component: ClubAudit
    },
    {
      path: '/members',
      name: 'Members',
      component: Members
    },
    {
      path: '/launched',
      name: 'Launched',
      component: Launched
    },
    {
      path: '/launchedshort',
      name: 'LaunchedShort',
      component: LaunchedShort
    },
    {
      path: '/allactive',
        name: 'AllActive',
      component: AllActive,
      meta: {
        keepAlive: true, // 此组件需要被缓存
        isBack:false, //用于判断上一个页面是哪个

      }
    },
    {
      path: '/evaluation',
      name: 'Evaluation',
      component: Evaluation
    },

    {
      path: '/comment',
      name: 'Comment',
      component: Comment
    },
    {
      path: '/alldynamic',
      name: 'AllDynamic',
      component: AllDynamic,
      meta: {
        keepAlive: true, // 此组件需要被缓存
        isBack:false, //用于判断上一个页面是哪个

      }
    },

    {
      path: '/dynamicdetail',
      name: 'DynamicDetail',
      component: DynamicDetail
    },
    {
      path: '/likelist',
      name: 'LikeList',
      component: LikeList
    },
    {
      path: '/tribal',
      name: 'Tribal',
      component: Tribal
    },
    {
      path: '/activedetail',
      name: 'ActiveDetail',
      component: ActiveDetail
    },
    {
      path: '/activedetailshort',
      name: 'ActiveDetailShort',
      component: ActiveDetailShort
    },
    {
      path: '/issueactivedetail',
      name: 'IssueActiveDetail',
      component: IssueActiveDetail
    },
      {
          path: '/launchedissue',
          name: 'LaunchedIssue',
          component: LaunchedIssue
      },
      {
          path: '/launchedlong',
          name: 'LaunchedLong',
          component: LaunchedLong
      },
      {
          path: '/membersactive',
          name: 'MembersActive',
          component: MembersActive
      },
      {
          path: '/playerspage',
          name: 'PlayersPage',
          component: PlayersPage
      },
      {
          path: '/soccerhome',
          name: 'SoccerHome',
          component: SoccerHome
      },

      {
          path: '/enterpriseaudit',
          name: 'EnterpriseAudit',
          component: EnterpriseAudit
      },
      {
          path: '/myclub',
          name: 'MyClub',
          component: MyClub,
          meta: {
            keepAlive: true, // 此组件需要被缓存
            isBack:false, //用于判断上一个页面是哪个
    
          }
      },
      {
          path: '/myactive',
          name: 'MyActive',
          component: MyActive,
          meta: {
            keepAlive: true, // 此组件需要被缓存
            isBack:false, //用于判断上一个页面是哪个
    
          }
      },
      {
          path: '/applyrefund',
          name: 'ApplyRefund',
          component: ApplyRefund,
          meta: {
            keepAlive: true, // 此组件需要被缓存
            isBack:false, //用于判断上一个页面是哪个
    
          }
      },

      {
          path: '/personalcenter',
          name: 'PersonalCenter',
          component: PersonalCenter,
          meta: {
            keepAlive: true, // 此组件需要被缓存
            isBack:false, //用于判断上一个页面是哪个
    
          }
      },
      {
          path: '/businessinvitation',
          name: 'BusinessInvitation',
          component: BusinessInvitation
      },
      {
          path: '/editinformation',
          name: 'EditInformation',
          component: EditInformation
      },
      {
          path: '/dynamicreply',
          name: 'DynamicReply',
          component: DynamicReply
      },
      {
          path: '/signinactive',
          name: 'SigninActive',
          component: SigninActive,
          meta: {
            keepAlive: true, // 此组件需要被缓存
            isBack:false, //用于判断上一个页面是哪个
    
          }
      },
      {
          path: '/newactive',
          name: 'NewActive',
          component: NewActive,
          meta: {
            keepAlive: true, // 此组件需要被缓存
            isBack:false, //用于判断上一个页面是哪个
    
          }
      },
      {
          path: '/hitcard',
          name: 'Hitcard',
          component: Hitcard
      },
      {
          path: '/hitcardaddress',
          name: 'HitcardAddress',
          component: HitcardAddress
      },
      {
        path: '/paypage',
        name: 'Paypage',
        component: Paypage
    },
    {
      path: '/clubshare',
      name: 'ClubShare',
      component: ClubShare
    },

    {
      path: '/commpanyshare',
      name: 'CommpanyShare',
      component: CommpanyShare
    },
    {
      path: '/changepassword',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '/videoplayer',
      name: 'VideoPlayer',
      component: VideoPlayer
    },
  ]
})
