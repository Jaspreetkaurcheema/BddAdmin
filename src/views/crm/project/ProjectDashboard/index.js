import React, { useEffect } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { getProjectDashboardData } from './store/dataSlice'
import { Loading } from 'components/shared'
import ProjectDashboardHeader from './components/ProjectDashboardHeader'
import TaskOverview from './components/TaskOverview'
import MyTasks from './components/MyTasks'
import Projects from './components/Projects'
import Schedule from './components/Schedule'
import Activities from './components/Activities'
import { useDispatch, useSelector } from 'react-redux'

injectReducer('projectDashboard', reducer)

const ProjectDashboard = () => {
    // const dispatch = useDispatch()

    // const data = {
    //     "userName": "Carolyn Perkins",
    //     "taskCount": 5,
    //     "projectOverviewData": {
    //       "chart": {
    //         "daily": {
    //           "onGoing": 13,
    //           "finished": 9,
    //           "total": 21,
    //           "series": [
    //             {
    //               "name": "On Going",
    //               "data": [20, 19, 18, 14, 12, 10]
    //             },
    //             {
    //               "name": "Finished",
    //               "data": [1, 4, 8, 15, 16, 18]
    //             }
    //           ],
    //           "range": ["6:00am", "9:00am", "12:00pm", "03:00pm", "06:00pm", "09:00pm"]
    //         },
    //         "weekly": {
    //           "onGoing": 126,
    //           "finished": 87,
    //           "total": 213,
    //           "series": [
    //             {
    //               "name": "On Going",
    //               "data": [45, 52, 68, 84, 103, 112, 126]
    //             },
    //             {
    //               "name": "Finished",
    //               "data": [35, 41, 62, 62, 75, 81, 87]
    //             }
    //           ],
    //           "range": ["21 Jan", "22 Jan", "23 Jan", "24 Jan", "25 Jan", "26 Jan", "27 Jan"]
    //         },
    //         "monthly": {
    //           "onGoing": 270,
    //           "finished": 113,
    //           "total": 383,
    //           "series": [
    //             {
    //               "name": "On Going",
    //               "data": [28, 52, 91, 154, 227, 256, 270]
    //             },
    //             {
    //               "name": "Finished",
    //               "data": [22, 31, 74, 88, 97, 107, 113]
    //             }
    //           ],
    //           "range": ["01 Jan", "05 Jan", "10 Jan", "15 Jan", "20 Jan", "25 Jan", "27 Jan"]
    //         }
    //       }
    //     },
    //     "myTasksData": [
    //       {
    //         "taskId": "KCM-1393",
    //         "taskSubject": "Design sign up flow",
    //         "priority": 0,
    //         "assignees": [
    //           {
    //             "id": "1",
    //             "name": "Carolyn Perkins",
    //             "email": "eileen_h@hotmail.com",
    //             "img": "/img/avatars/thumb-1.jpg"
    //           },
    //           {
    //             "id": "2",
    //             "name": "Terrance Moreno",
    //             "email": "",
    //             "img": "/img/avatars/thumb-2.jpg"
    //           }
    //         ]
    //       },
    //       {
    //         "taskId": "KCM-2039",
    //         "taskSubject": "Update contact page",
    //         "priority": 1,
    //         "assignees": [
    //           {
    //             "id": "1",
    //             "name": "Carolyn Perkins",
    //             "email": "eileen_h@hotmail.com",
    //             "img": "/img/avatars/thumb-1.jpg"
    //           }
    //         ]
    //       },
    //       // Other tasks data...
    //     ],
    //     "scheduleData": [
    //       {
    //         "id": "0",
    //         "time": "10:00am",
    //         "eventName": "Sprint Planning",
    //         "desciption": "via Zoom",
    //         "type": "meeting"
    //       },
    //       {
    //         "id": "1",
    //         "time": "1:00pm",
    //         "eventName": "Design discussion",
    //         "desciption": "via Microsoft Teams",
    //         "type": "meeting"
    //       },
    //       // Other schedule data...
    //     ],
    //     "projectsData": [
    //       {
    //         "id": 27,
    //         "name": "EVO SaaS",
    //         "category": "Web Application",
    //         // Other project data...
    //       },
    //       // Other projects data...
    //     ],
    //     "activitiesData": [
    //       {
    //         "type": "UPDATE-TICKET",
    //         "dateTime": 1646580000,
    //         "ticket": "PD-979",
    //         "status": 0,
    //         "userName": "Carolyn Perkins",
    //         // Other activity data...
    //       },
    //       // Other activities data...
    //     ],
    //     "id": "1"
    //   };
    

    // const {
    //     userName,
    //     taskCount,
    //     projectOverviewData,
    //     myTasksData,
    //     scheduleData,
    //     projectsData,
    //     activitiesData,
    // } = data
    // const loading = false;

    // // useEffect(() => {
    // //     fetchData()
    // //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // // }, [])

    // // const fetchData = () => {
    // //     dispatch(getProjectDashboardData())
    // // }

    // return (
    //     <div className="flex flex-col gap-4 h-full">
    //         <Loading loading={loading}>
    //             <ProjectDashboardHeader data={{ userName, taskCount }} />
    //             <div className="flex flex-col xl:flex-row gap-4">
    //                 <div className="flex flex-col gap-4 flex-auto">
    //                     <TaskOverview data={projectOverviewData} />
    //                     <MyTasks data={myTasksData} />
    //                     <Projects data={projectsData} />
    //                 </div>
    //                 <div className="flex flex-col gap-4">
    //                     <div className="xl:w-[380px]">
    //                         <Schedule data={scheduleData} />
    //                         <Activities data={activitiesData} />
    //                     </div>
    //                 </div>
    //             </div>
    //         </Loading>
    //     </div>
    // )
    return (
      <div>
        <h1>Welcome to Dashboard Page</h1>
        
      </div>
    );
    
}

export default ProjectDashboard
