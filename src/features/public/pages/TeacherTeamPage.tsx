import './TeacherTeamPage.css'
import { PublicHeader } from '../components/PublicHeader'
import { PublicFooter } from '../components/PublicFooter'
import { publicMock } from '../mocks/public.mock'

type TeacherProfile = {
  id: string
  prefix: 'Cô' | 'Thầy'
  name: string
  title: string
  description: string
  image: string
}

const teacherProfiles: TeacherProfile[] = [
  {
    id: 'teacher-1',
    prefix: 'Cô',
    name: 'Nguyễn Minh Anh',
    title: 'Chuyên gia Ngôn ngữ học',
    description:
      'Với hơn 15 năm kinh nghiệm giảng dạy Ngữ văn và Văn học thế giới, Cô Minh Anh tập trung vào việc khơi gợi khả năng cảm thụ nghệ thuật và tư duy phản biện cho học sinh thông qua các tác phẩm kinh điển.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCFEEhEAClPzal-ADexjNn14ningKKxNLR4AnQ_jIaLy2hr5R3JAVHcJIgv2vELUGhCdlYfNHGYFe-jh0rUHXTD3kjnitKsJaojQ2aiq6_qK3wkExoSQMPZRKfoFg3Ab9u9h8CFObAXxYLS6akYoQjwEJXcc4AO8h4T1EPDdfq3iTM-SdrpSvCndP-mSyndnNTdLEf-jTsCfNifOTflcEO8ZkzeZgxAf-lSg59TQTGgfdRKpwl9Z0aUmnSUgKiIytFnCZc_jHE8Qkg',
  },
  {
    id: 'teacher-2',
    prefix: 'Thầy',
    name: 'Lê Hoàng Nam',
    title: 'Tiến sĩ Toán học ứng dụng',
    description:
      'Thầy Nam tin rằng Toán học là ngôn ngữ của vũ trụ. Các bài giảng của thầy kết hợp giữa lý thuyết thuần túy và các ứng dụng thực tiễn trong công nghệ AI, giúp học sinh nắm bắt cốt lõi của logic số học.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCw7pHkf0cjOn2NG4DDobMYpmWOHmA9R5qUIk9ZZ88PJRHFdjiUA-lXMmREpf5Kl1uE0postuHUK3b54dwLXPUXJZk4UcT7BNlK7e7C3qKQuBSpJ6uKnmhg3jo0Xf0kMqyiqoAbqOxiO2fmPjoUJU1cBIwkcLxPvXYH8xD7yJCG9586Lo5C9aAcYvaEMwJRJj7Ukdv2slu5MCSFmyMecuyqiuR8PvTzOLQhtq3j3JCrxQEQ7xgn3DgXqfm40fBuC9Go-rYeG-ySwyY',
  },
  {
    id: 'teacher-3',
    prefix: 'Cô',
    name: 'Phạm Thuỳ Linh',
    title: 'Thạc sĩ Khoa học Tự nhiên',
    description:
      'Chuyên gia trong lĩnh vực Vật lý và Khoa học tích hợp. Cô Linh nổi tiếng với những phương pháp thực nghiệm sáng tạo, đưa phòng thí nghiệm vào đời sống để mỗi tiết học là một cuộc khám phá thú vị về thế giới quanh ta.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAAN-vazFCSwWgUZ-5nouN--WuoakssAEWX9WaZQyv3mBu0s0ZPA3w-ekGwl5Zh3EeVVnwV5CwQS4CRyom-jAM4V2zsGzuPi22kE0fHXFLIyxOpAxcmXA0zSdD_zLZm5fOVuYui25kev-lWnkzHfkDBRsXEMdCwiCfUQdOAiPEm8UIt7252dk1DSR9Rp-4sXbwKbeby6jxCOgRkYCOPmLXdX5a9iqnrpSpzEeIiwYFsg6Pt0v6XPbnZPD1ZZG1WA365eG-yHkJHrI4',
  },
  {
    id: 'teacher-4',
    prefix: 'Thầy',
    name: 'Trần Quốc Bảo',
    title: 'Nghiên cứu sinh Lịch sử thế giới',
    description:
      'Với cách tiếp cận lịch sử qua dòng chảy văn minh và những câu chuyện nhân bản, thầy Bảo giúp học sinh không chỉ nhớ các mốc thời gian mà còn thấu hiểu những bài học quý giá từ quá khứ để định hình hiện tại.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA-1EE5Xmk8dFrzVln5pULUyw0-iu_VpP8j7HUxRmG19kivWpGGzvCMrwxe6ninJNnV0nYa2qRDkQl2GEWbcQOEn4iDF9CI20_Q8uS4i7CNw_QFkhiL94nQZR29pP6ymljSBlsA4754RCbpn8z6qd2RkqINKI9irCchfP3C-2-Z_APHG8MpBNFGBcdTKYP4pSpOUIR4cNae432xKHsPVxpZbBmPndjBVDYT-yXApobhX3q5CjCwY_0ZgRvu6-3ungaCadMaUe2yYeE',
  },
]

export function TeacherTeamPage() {
  return (
    <div className="teacher-team-page">
      <PublicHeader />

      <main className="teacher-team-page__main">
        <section className="teacher-team-page__hero">
          <div className="teacher-team-page__container teacher-team-page__container--hero">
            <span className="teacher-team-page__eyebrow">EXPERTISE &amp; PASSION</span>

            <h1 className="teacher-team-page__title">Đội ngũ giáo viên</h1>

            <p className="teacher-team-page__subtitle">
              Những người dẫn dắt tại iX không chỉ là những học giả, họ là những người kiến tạo
              tương lai với tư duy đổi mới và lòng nhiệt huyết.
            </p>
          </div>
        </section>

        <section className="teacher-team-page__section">
          <div className="teacher-team-page__container teacher-team-page__container--teachers">
            <div className="teacher-team-page__list">
              {teacherProfiles.map((teacher, index) => (
                <div key={teacher.id}>
                  <article className="teacher-team-page__teacher">
                    <div className="teacher-team-page__avatar-wrap">
                      <div className="teacher-team-page__avatar-frame">
                        <img
                          className="teacher-team-page__avatar"
                          src={teacher.image}
                          alt={`${teacher.prefix} ${teacher.name}`}
                        />
                      </div>
                    </div>

                    <div className="teacher-team-page__content">
                      <div className="teacher-team-page__heading">
                        <h2 className="teacher-team-page__teacher-name">
                          <span className="teacher-team-page__teacher-prefix">
                            {teacher.prefix}:
                          </span>{' '}
                          {teacher.name}
                        </h2>

                        <span className="teacher-team-page__teacher-title">{teacher.title}</span>
                      </div>

                      <p className="teacher-team-page__teacher-description">
                        {teacher.description}
                      </p>
                    </div>
                  </article>

                  {index < teacherProfiles.length - 1 ? (
                    <div className="teacher-team-page__divider" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}