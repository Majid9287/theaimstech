import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import parse from 'html-react-parser';
const CoursePage = () => {
  const [course, setCourse] = useState(null);
  const router = useRouter();
  const { courseId } = router.query;
  useEffect(() => {
    // Fetch the course details using the courseId prop
    const fetchCourseDetails = async () => {
      try {
        const res = await fetch(`/api/course/getonecourse?id=${courseId}`);
        const data = await res.json();
        setCourse(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  
  
  return (
    <div className="bg-gray-100 relative">
      <div className="container mx-auto h-full relative py-24 ">
        <div className="max-w-3xl mx-auto bg-white p-12 rounded-t-lg">
          {course && (
            <>
              <h1 className="text-3xl font-bold my-4">{course.name}</h1>
              
              <div>{parse(course.description)}</div>
                <div dangerouslySetInnerHTML={{ __html: course.description}} />
               
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
