import { useRouter } from 'next/router'
import { useState } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Image from 'next/image'
import LearningPointLogoSrc from '../../public/images/logos/updated-logo2.png'
import UserSelectionModal from '../@core/custom-components/modals/index'

const Home = () => {
  const router = useRouter()
  let [course, setCourse] = useState([])
  let [quiz, setQuiz] = useState()
  let [studentRegistration, setStudentRegistration] = useState([])
  let [trainerRegistration, setTrainerRegistration] = useState([])

  const [open, setIsOpen] = useState(false)

  return (
    <section className='home'>
      <div className='hero'>
        <UserSelectionModal isOpen={open} onClose={() => setIsOpen(false)} />
        <div className='leftSide'>
          <Image src={LearningPointLogoSrc} alt='logo' width={300} height={300} />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore corporis, suscipit numquam corrupti ullam
            similique porro dolore laboriosam. Sapiente, consequuntur voluptate! Qui dolore sunt cupiditate quasi earum
            repellendus numquam expedita?
          </p>
          <button onClick={() => setIsOpen(true)}>Get Started</button>
        </div>
        <div className='rightSide1'>
          <div className='image'></div>
        </div>
      </div>

      <div className='shortInfo'>
        <div className='course1'>
          <h1 className='heading'>Courses</h1>
          <p>Total Courses</p>
          <h1 className='head'>{course && (course.length > 0) & (course.length < 10) && '0' + course.length}</h1>
        </div>

        <div className='studentRegister'>
          <h1 className='heading'>Students</h1>
          <p>Total Students</p>
          <h1 className='head'>
            {studentRegistration &&
              (studentRegistration.length > 0) & (studentRegistration.length < 10) &&
              '0' + studentRegistration.length}
          </h1>
          <h1>{studentRegistration && studentRegistration.length >= 10 && studentRegistration.length}</h1>
        </div>

        <div className='trainer'>
          <h1 className='heading'>Teachers</h1>
          <p>Total teachers</p>
          <h1 className='head'>
            {trainerRegistration &&
              (trainerRegistration.length > 0) & (trainerRegistration.length < 10) &&
              '0' + trainerRegistration.length}
          </h1>
          <h1>{trainerRegistration && trainerRegistration.length >= 10 && trainerRegistration.length}</h1>
        </div>
      </div>
    </section>
  )
}
Home.getLayout = page => <BlankLayout isHome={true}>{page}</BlankLayout>

export default Home
