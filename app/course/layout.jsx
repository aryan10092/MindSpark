import CourseHeader from './[courseId]/_components/CourseHeader'

export default function CourseLayout({ children }) {
  return (
    <div>
      <CourseHeader />
      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        
        {children}
       </div>
    </div>
  )
} 
