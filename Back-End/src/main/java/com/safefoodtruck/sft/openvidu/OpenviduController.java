package com.safefoodtruck.sft.openvidu;

import jakarta.annotation.PostConstruct;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;

@Slf4j
@CrossOrigin(origins = "")
@RestController
@RequestMapping("/openvidu/sessions")
@RequiredArgsConstructor
public class OpenviduController {

    @Value("${openvidu.url}")
    private String OPENVIDU_URL;

    @Value("${openvidu.secret}")
    private String OPENVIDU_SECRET;

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        log.info(OPENVIDU_URL + " :: " + OPENVIDU_SECRET);
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    /**
     * @param params The Session properties
     * @return The Session ID
     */
    @PostMapping
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
        throws OpenViduJavaClientException, OpenViduHttpException {
        log.info("진입 params: " + params);
        SessionProperties properties = SessionProperties.fromJson(params).build();
        log.info("1 properties: " + properties.customSessionId());
        Session session = openvidu.createSession(properties);
        log.info("session Id: " + session.getSessionId());
        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }
    /**
     * @param sessionId The Session in which to create the Connection
     * @param params    The Connection properties
     * @return The Token associated to the Connection
     */
    @PostMapping("/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
        @RequestBody(required = false) Map<String, Object> params)
        throws OpenViduJavaClientException, OpenViduHttpException {

        // 세션 ID와 요청 매개변수 로그 출력
        log.info("sessionId: {}", sessionId);

        // 세션 가져오기
        Session session = openvidu.getActiveSession(sessionId);
        if (session == null) {
            log.warn("Session not found: {}", sessionId);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // 연결 속성 생성 및 로그 출력
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        log.info("Connection properties: {}", properties);

        // 연결 생성 및 로그 출력
        Connection connection = session.createConnection(properties);
        log.info("Connection token: {}", connection.getToken());

        // 연결 토큰을 포함한 응답 반환
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }
}
