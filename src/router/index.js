import Vue from 'vue'
import VueRouter from 'vue-router'

import Chatgpt from '../components/Chatgpt'
import Ask from '../components/Ask'  
import Translate from '../components/Translate' 
import Code from '../components/Code' 
import ExplainCode from '../components/ExplainCode'  
import Interview from '../components/Interview' 
import Continue from '../components/Continue'
// import Abstract from '../components/Abstract' 
import Rabbit from '../components/Rabbit' 
import Words from '../components/Words'  
import Image from '../components/Image'  
import Advanced from '../components/Advanced'  
import Contact from '../components/Contact' 


Vue.use(VueRouter)

const routes = [
	{
	  path: '/',
	  name: 'chatgpt',
	  component: Chatgpt,
	},
	{
	  path: '/ask',
	  name: 'ask',
	  component: Ask,
	},

	{
	  path: '/translate',
	  name: 'translate',
	  component: Translate,
	},
	{
	  path: '/code',
	  name: 'code',
	  component: Code,
	}, 
	{
	  path: '/explaincode',
	  name: 'explaincode',
	  component: ExplainCode,
	},  
	{
	  path: '/interview',
	  name: 'interview',
	  component: Interview,
	},
	{
	  path: '/continue',
	  name: 'continue',
	  component: Continue,
	}, 
	// {
	//   path: '/abstract',
	//   name: 'abstract',
	//   component: Abstract,
	// }, 
	{
	  path: '/rabbit',
	  name: 'rabbit',
	  component: Rabbit,
	},
	{
	  path: '/words',
	  name: 'words',
	  component: Words,
	},
	{
	  path: '/image',
	  name: 'image',
	  component: Image,
	},
	{
	  path: '/advanced',
	  name: 'advanced',
	  component: Advanced,
	},
	{
	  path: '/contact',
	  name: 'contact',
	  component: Contact,
	}
]

const router = new VueRouter({
  mode: 'history',
  // mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
