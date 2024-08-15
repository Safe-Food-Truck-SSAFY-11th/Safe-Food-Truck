package com.safefoodtruck.sft.openvidu.service;

import com.safefoodtruck.sft.notification.service.NotificationService;
import com.safefoodtruck.sft.openvidu.exception.NullSessionException;
import com.safefoodtruck.sft.openvidu.exception.OpenviduException;
import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;
import jakarta.annotation.PostConstruct;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class OpenviduServiceImpl implements OpenviduService {

    @Value("${openvidu.url}")
    private String OPENVIDU_URL;

    @Value("${openvidu.secret}")
    private String OPENVIDU_SECRET;

    private final NotificationService notificationService;
    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        log.info(OPENVIDU_URL + " :: " + OPENVIDU_SECRET);
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    @Override
    public String initSession(Map<String, Object> params) {
        try {
            openvidu.fetch();
            SessionProperties properties = SessionProperties.fromJson(params).build();
            Session session = openvidu.createSession(properties);
            String sessionId = session.getSessionId();
            log.info("진입 params: " + params);
            log.info("properties: " + properties.customSessionId());
            log.info("session Id: " + session.getSessionId());

            notificationService.liveStartNotify(Integer.parseInt(sessionId));
            return sessionId;
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new OpenviduException(e.getMessage());
        }
    }

    @Override
    public String connectSession(String sessionId, Map<String, Object> params) {

        try {
            openvidu.fetch();

            // 세션 ID와 요청 매개변수 로그 출력
            log.info("sessionId: {}", sessionId);

            // 세션 가져오기
            Session session = openvidu.getActiveSession(sessionId);
            if (session == null) {
                log.warn("Session not found: {}", sessionId);
                throw new NullSessionException();
            }
            // 연결 속성 생성
            ConnectionProperties properties = ConnectionProperties.fromJson(params).build();

            // 연결 생성 및 로그 출력
            Connection connection;
            connection = session.createConnection(properties);
            log.info("Connection token: {}", connection.getToken());
            return connection.getToken();
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new OpenviduException(e.getMessage());
        }
    }

    @Override
    public void closeSession(String sessionId) {
        try {
            openvidu.fetch();
            Session session = openvidu.getActiveSession(sessionId);

            if (session == null) {
                log.info("세션을 종료 하려는데 존재하는 세션이 없음");
                throw new NullSessionException();
            }
            log.info("sessionId: " + session.getSessionId());

            List<Connection> activeConnections = session.getActiveConnections();
            log.info("activeConnections: " + activeConnections.size());
            for (Connection connection : activeConnections) {
                log.info("disconnect token: " + connection.getToken());
                session.forceDisconnect(connection);
            }
            notificationService.liveEndNotify(Integer.parseInt(sessionId));
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new OpenviduException(e.getMessage());
        }
    }
}
