import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Codelogin from '@/components/Codelogin'
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
import Hitcard from '@/components/Hitcard'
import HitcardAddress from '@/components/HitcardAddress'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
        meta: {
            title: '俱乐部'
        }

    },
    {
      path: '/codelogin',
      name: 'Codelogin',
      component: Codelogin
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
      component: AllClub
    },
    {
      path: '/createclub',
      name: 'CreateClub',
      component: CreateClub
    },

    {
      path: '/clubindex',
      name: 'ClubIndex',
      component: ClubIndex
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
      component: AllActive
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
      component: AllDynamic
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
          component: MyClub
      },
      {
          path: '/myactive',
          name: 'MyActive',
          component: MyActive
      },
      {
          path: '/applyrefund',
          name: 'ApplyRefund',
          component: ApplyRefund
      },

      {
          path: '/personalcenter',
          name: 'PersonalCenter',
          component: PersonalCenter
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
          component: SigninActive
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
  ]
})
