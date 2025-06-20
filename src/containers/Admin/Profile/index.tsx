import { NO_DATA } from '@/utils';
import { HomeTwoTone, MailTwoTone, PhoneTwoTone } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button, Col, Divider, Image, Result, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import InformationTabs from './InformationTabs';
import './styles.scss';
import { useProfile } from './useProfile';

const AdminProfile = () => {
  const navigate = useNavigate();
  const {
    states: { profile: admin },
  } = useProfile();
  return admin ? (
    <Row justify="center" className="profile-container" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col
        xs={{
          span: 24,
        }}
        md={{
          span: 8,
        }}
      >
        <ProCard
          className="profile-container__short-information"
          colSpan={{ xs: 24, md: 8 }}
          layout="center"
          direction="column"
          bordered
        >
          <Image
            className="profile-container__image"
            width={100}
            src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          />
          <Typography.Title className="profile-container__title" level={3}>
            {admin?.username}
          </Typography.Title>
          <Typography.Title className="profile-container__subtitle" level={4}>
            {admin?.firstName || NO_DATA} {admin?.middleName || NO_DATA}
            {admin?.lastName || NO_DATA}
          </Typography.Title>
          <ProCard layout="default">
            <div className="profile-container__info">
              <Typography.Text>
                <MailTwoTone />
              </Typography.Text>
              <Typography.Text
                className="profile-container__info--text"
                copyable
                ellipsis={{ tooltip: true }}
                style={{ width: '80%' }}
              >
                {admin?.email}
              </Typography.Text>
            </div>
            <div className="profile-container__info">
              <Typography.Text>
                <PhoneTwoTone />
              </Typography.Text>
              <Typography.Text className="profile-container__info--text" copyable>
                {admin?.phoneNumber}
              </Typography.Text>
            </div>
            <div className="profile-container__info">
              <Typography.Text>
                <HomeTwoTone />
              </Typography.Text>
              <Typography.Text className="profile-container__info--text" copyable>
                {admin?.address}
              </Typography.Text>
            </div>
          </ProCard>
          <Divider dashed />
        </ProCard>
      </Col>
      <Col
        xs={{
          span: 24,
        }}
        md={{
          span: 16,
        }}
      >
        <ProCard
          className="profile-container__information-tabs"
          colSpan={{ xs: 24, md: 16 }}
          bordered
        >
          <InformationTabs  />
        </ProCard>
      </Col>
    </Row>
  ) : (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, this user does not exist."
      extra={
        <Button type="primary" onClick={() => navigate('/admin/dashboard')}>
          Back Home
        </Button>
      }
    />
  );
};

export default AdminProfile;
