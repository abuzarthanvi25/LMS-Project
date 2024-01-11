import { useRouter } from 'next/router'
import { useState } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Image from 'next/image'
import LearningPointLogoSrc from '../../public/images/logos/updated-logo2.png'
import UserSelectionModal from '../@core/custom-components/modals/index'
import AnimatedDiv from "../@core/custom-components/animated-divs/index"

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
        <AnimatedDiv>
          <div className='leftSide'>
            <Image src={LearningPointLogoSrc} alt='logo' width={300} height={300} />
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore corporis, suscipit numquam corrupti ullam
              similique porro dolore laboriosam. Sapiente, consequuntur voluptate! Qui dolore sunt cupiditate quasi earum
              repellendus numquam expedita?
            </p>
            <button onClick={() => setIsOpen(true)}>Get Started</button>
          </div>
        </AnimatedDiv>
        <AnimatedDiv animation={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}>
          <div className='rightSide1'>{/* <div className='image'></div> */}</div>
        </AnimatedDiv>
      </div>

      <div className='shortInfo'>
        <AnimatedDiv animation={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}>
          <div className='course1'>
            <h1 className='heading'>Courses</h1>
            <p>Total Courses</p>
            <h1 className='head'>{course && (course.length > 0) & (course.length < 10) && '0' + course.length}</h1>
          </div>
        </AnimatedDiv>


        <AnimatedDiv animation={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        }}>
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
        </AnimatedDiv>

        <AnimatedDiv animation={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        }}>
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
        </AnimatedDiv>
      </div>

      <div className='sec-padded'>
        <div className='container'>
          <div className='contentSection'>
            <div className='image'>
              <AnimatedDiv animation={{
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0 },
              }}>
                <img alt='' src='images/custom-images/560.jpg' />
              </AnimatedDiv>
            </div>
            <div className='content'>
              <AnimatedDiv animation={{
                hidden: { opacity: 0, x: 200 },
                visible: { opacity: 1, x: 0 },
              }}>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore corporis, suscipit numquam corrupti
                  ullam similique porro dolore laboriosam. Sapiente, consequuntur voluptate! Qui dolore sunt cupiditate
                  quasi earum repellendus numquam expedita?
                </p>
              </AnimatedDiv>
            </div>
          </div>
        </div>
      </div>

      <div className='sec-padded'>
        <div className='container'>
          <div className='contentSection sty2'>
            <div className='image'>
              <AnimatedDiv animation={{
                hidden: { opacity: 0, x: 200 },
                visible: { opacity: 1, x: 0 },
              }}>
                <img alt='' src='images/custom-images/566.jpg' />
              </AnimatedDiv>
            </div>
            <div className='content'>
              <AnimatedDiv animation={{
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0 },
              }}>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore corporis, suscipit numquam corrupti
                ullam similique porro dolore laboriosam. Sapiente, consequuntur voluptate! Qui dolore sunt cupiditate
                quasi earum repellendus numquam expedita?
              </p>
              </AnimatedDiv>
            </div>
          </div>
        </div>
      </div>

      <div className='footer'>
        <div className='inner-footer'>
          <div className='footer-items'>
            <h1>Company Name</h1>
            <p>Description of any product or motto of the company.</p>
          </div>

          <div className='footer-items'>
            <h3>Quick Links</h3>
            <div className='border1'></div>
            <ul>
              <a href='#'>
                <li>Home</li>
              </a>
              <a href='#'>
                <li>Search</li>
              </a>
              <a href='#'>
                <li>Contact</li>
              </a>
              <a href='#'>
                <li>About</li>
              </a>
            </ul>
          </div>

          <div className='footer-items'>
            <h3>Recipes</h3>
            <div className='border1'></div>
            <ul>
              <a href='#'>
                <li>Indian</li>
              </a>
              <a href='#'>
                <li>Chinese</li>
              </a>
              <a href='#'>
                <li>Mexican</li>
              </a>
              <a href='#'>
                <li>Italian</li>
              </a>
            </ul>
          </div>

          <div className='footer-items'>
            <h3>Contact us</h3>
            <div className='border1'></div>
            <ul>
              <li>
                <i className='fa fa-map-marker' aria-hidden='true'></i>XYZ, abc
              </li>
              <li>
                <i className='fa fa-phone' aria-hidden='true'></i>123456789
              </li>
              <li>
                <i className='fa fa-envelope' aria-hidden='true'></i>xyz@gmail.com
              </li>
            </ul>

            <div className='social-media'>
              <a href='#'>
                <i className='fab fa-instagram'></i>
              </a>
              <a href='#'>
                <i className='fab fa-facebook'></i>
              </a>
              <a href='#'>
                <i className='fab fa-google-plus-square'></i>
              </a>
            </div>
          </div>
        </div>

        <div className='footer-bottom'>All rights reserved</div>
      </div>
    </section>
  )
}
Home.getLayout = page => <BlankLayout isHome={true}>{page}</BlankLayout>

export default Home
