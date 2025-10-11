<template>
  <div>
    <NavBar />
    
    <!-- Sticky Back to Home Button -->
    <RouterLink class="btn-back-home" to="/" title="Back to Home">
      <i class="bi bi-house-fill"></i>
      <span class="btn-text">Back to Home</span>
    </RouterLink>
    
    <section class="page-wrap">
      <!-- Hero -->
      <header class="hero">
      <h1>Distributed Sharding Database System (ShardingJH)</h1>
      <p class="tagline">
        Horizontally scalable, fault-aware, and eventually consistent system across EC2 nodes.
      </p>
      <div class="hero-cta">
        <a class="btn primary" :href="projectReport" target="_blank" rel="noopener">
          Read the Full Report (PDF)
        </a>
        <a class="btn" href="https://youtu.be/kl9JrnHCmfs" target="_blank" rel="noopener">
          Watch Demo Video
        </a>
      </div>
    </header>

    <!-- Highlight metrics -->
    <section class="metrics">
      <div class="card">
        <div class="metric">~10 ms</div>
        <div class="label">Instant node failure broadcast with Gossip + Heartbeat synergy</div>
      </div>
      <div class="card">
        <div class="metric">&lt; 0.3 s</div>
        <div class="label">Real-time product update propagation across the cluster</div>
      </div>
      <div class="card">
        <div class="metric">MVCC</div>
        <div class="label">Multi-Version Concurrency Control ensuring isolation under parallel updates</div>
      </div>
    </section>

    <!-- Project overview -->
    <section class="grid two project-overview-section">
      <div>
        <h2>Project Overview</h2>
        <p>
          This project implements a distributed sharded database system designed for scalability, consistency,
          and fault tolerance. Built with Spring Boot, each node runs independently on AWS EC2 with its own
          SQLite shard, connected through RabbitMQ for real-time data synchronization and replication.
        </p>
        <p>
          Data is partitioned across nodes using hybrid sharding strategies that combine uniform distribution
          with time-aware routing.
        </p>
        <ul class="bullets">
          <li><strong>Hash sharding</strong> uniformly distributes <em>Member</em> data across shards.</li>
          <li><strong>Range sharding</strong> partitions <em>Orders</em> by creation time for efficient queries.</li>
        </ul>
        <p>
          Meanwhile, Product data is fully replicated across nodes using a fanout exchange to ensure availability and eventual consistency.
        </p>
        <p>
          Cluster membership and failure detection are maintained through gossip-based communication and heartbeat
          monitoring, while MVCC (Multi-Version Concurrency Control) secures concurrent updates. Together with
          static file replication, the system remains resilient and highly available even during partial node failures.
        </p>
        <p>
          In essence, this modular, message-driven architecture delivers horizontal scalability and operational robustness
          without relying on heavyweight distributed databases.
        </p>
      </div>
      <figure class="img-card clickable-img">
        <img 
          :src="deploymentImage" 
          alt="Deployment diagram"
          @click="openImageModal(deploymentImage, 'Deployment across EC2 nodes with RabbitMQ (from report Appendix).')"
        >
        <figcaption>Deployment across EC2 nodes with RabbitMQ (from report Appendix).</figcaption>
      </figure>
    </section>

    <!-- Architecture -->
    <section class="grid two architecture-section">
      <div class="architecture-left">
        <h2>Architecture</h2>
        <p>
          The system adopts a modular distributed architecture in which each node operates as an independent Spring Boot service but cooperates through HTTP, UDP, and RabbitMQ communication layers.
        </p>

        <h3>Node Design</h3>

        <p>
          Each node includes:
        </p>
        <ul>
          <li>A Spring Boot application exposing REST APIs for Members, Orders, Products, and Files.</li>
          <li>A local SQLite database holding its assigned shard.</li>
          <li>Background services for Gossip membership, Heartbeats, RabbitMQ consumers, and file replication.</li>
          <li>A security layer using X-Signature (HMAC-SHA256) to authenticate inter-node requests.</li>
        </ul>
        <p>
          All nodes are identical and stateless — any node can receive a client request and, if necessary, forward it to the correct shard node based on routing rules.
        </p>

        <h3>Routing and Data Access</h3>

        <p>
          The ShardRoutingDataSource dynamically directs queries to the correct SQLite database using a thread-local ShardContext.
        </p>
        <p>
          For example, when inserting an order:
        </p>
        <ul>
          <li>The API determines the target shard based on order.getYear().</li>
          <li>The context is set to that shard before repository access.</li>
          <li>The same DAO layer transparently executes on the appropriate physical DB.</li>
        </ul>
        <p>
          This design enables seamless multi-shard operations without changing repository logic, simplifying both scaling and maintenance.
        </p>
        <h4>Communication Channels</h4>
        <ul>
          <li>HTTP REST – Handles requests, routing, and replication.</li>
          <li>UDP Gossip – Broadcasts membership events (HOST_ADD, HOST_DOWN).</li>
          <li>RabbitMQ AMQP – Synchronizes product updates across all nodes.</li>
        </ul>
        <p>
          This layered communication model provides both strong consistency within nodes and eventual consistency across the cluster.
        </p>
        <h4>Deployment Topology</h4>
        <p>
          Nodes are deployed on AWS EC2 behind an Nginx reverse proxy. Each node is self-contained; adding or removing nodes requires no downtime — they automatically discover peers through gossip and begin participating in replication.
        </p>
        <p>
          This design balances simplicity, autonomy, and real-time synchronization, forming the foundation for the system’s scalability and resilience.
        </p>

        <div class="sequence-diagrams">
          <figure class="img-card clickable-img">
            <img 
              :src="productSeqImage" 
              alt="Product Sequence Diagram"
              @click="openImageModal(productSeqImage, 'Product Update Sequence (RabbitMQ)')"
            >
            <figcaption>Product Update Sequence (RabbitMQ)</figcaption>
          </figure>
          <figure class="img-card clickable-img">
            <img 
              :src="orderSeqImage" 
              alt="Order Sequence Diagram"
              @click="openImageModal(orderSeqImage, 'Order Sequence (Sharding + MVCC)')"
            >
            <figcaption>Order Sequence (Sharding + MVCC)</figcaption>
          </figure>
        </div>
      </div>

      <figure class="img-card clickable-img architecture-component">
        <img 
          :src="componentsImage" 
          alt="Component Diagram"
          @click="openImageModal(componentsImage, 'Component Diagram')"
        >
        <figcaption>Component Diagram</figcaption>
      </figure>
    </section>

    <!-- Sharding Strategies -->
    <section class="row g-4 sharding-section">
      <div class="col-12 col-md-6 sharding-column">
        <div class="sharding-copy">
          <h3>Hash Sharding (Members)</h3>
          <p>
            The Members table uses hash-based sharding, distributing data evenly across nodes via <code>hash(member_id) % N</code>.
            This ensures balanced load and constant-time routing for ID-based lookups, ideal for OLTP-style workloads.
          </p>
        </div>
        <figure class="img-card clickable-img sharding-figure">
          <img
            class="sharding-image"
            :src="hashImage"
            alt="Hash strategy"
            @click="openImageModal(hashImage, 'Hash sharding strategy for members')"
          >
          <figcaption>Hash sharding strategy for members</figcaption>
        </figure>
      </div>
      <div class="col-12 col-md-6 sharding-column">
        <div class="sharding-copy">
          <h3>Range Sharding (Orders)</h3>
          <p>
            Orders are partitioned by creation year (2024, 2025, old). This time-based strategy keeps queries localized and simplifies archival management.
          </p>
        </div>
        <figure class="img-card clickable-img sharding-figure">
          <img
            class="sharding-image"
            :src="rangeImage"
            alt="Range strategy"
            @click="openImageModal(rangeImage, 'Range sharding strategy for orders')"
          >
          <figcaption>Range sharding strategy for orders</figcaption>
        </figure>
      </div>
    </section>

    <!-- Algorithms -->
    <section class="algos">
      <h2>Core Algorithms & Services</h2>
      <div class="row g-4 algo-grid">
        <div class="col-12 col-md-6">
          <article class="algo-card">
            <div class="algo-title">
              <i class="bi bi-diagram-3-fill" aria-hidden="true"></i>
              <h4>Gossip Membership</h4>
            </div>
            <p class="algo-body">
              Nodes gossip membership data through UDP, sharing updates about joins and failures using <code>HOST_ADD</code> and <code>HOST_DOWN</code> messages.
              This ensures decentralized, fast membership convergence, typically under 10 ms for a four-node cluster, without requiring a master node.
            </p>
          </article>
        </div>
        <div class="col-12 col-md-6">
          <article class="algo-card">
            <div class="algo-title">
              <i class="bi bi-activity" aria-hidden="true"></i>
              <h4>Heartbeats</h4>
            </div>
            <p class="algo-body">
              Each node periodically pings others over HTTP to confirm liveness.
              If a node fails to respond within timeout (3s connect, 5s read), it’s marked failed and gossip is triggered. This two-layer strategy (active heartbeat + passive gossip) offers both <strong>speed</strong> and <strong>network efficiency</strong>.
            </p>
          </article>
        </div>
        <div class="col-12 col-md-6">
          <article class="algo-card">
            <div class="algo-title">
              <i class="bi bi-shuffle" aria-hidden="true"></i>
              <h4>MVCC on Orders</h4>
            </div>
            <p class="algo-body">
              MVCC prevents conflicting updates using version control. Each record carries a version field checked before writes:
              <br>
              <code>
              Thread A: version=1 → commit version=2<br>
              Thread B: version=1 → conflict (expected 1, found 2)
              </code>
              <br>
              This ensures no lost updates even under concurrent access, enabling lightweight optimistic concurrency in distributed transactions.
            </p>
          </article>
        </div>
        <div class="col-12 col-md-6">
          <article class="algo-card">
            <div class="algo-title">
              <i class="bi bi-broadcast-pin" aria-hidden="true"></i>
              <h4>RabbitMQ Fanout</h4>
            </div>
            <p class="algo-body">
              When a node modifies a product, it publishes an event to a <strong>RabbitMQ fanout exchange</strong>.
              Every node consumes this event and applies it locally, ensuring all replicas stay synchronized with <strong>eventual consistency</strong> within seconds.
            </p>
          </article>
        </div>
        <div class="col-12 col-md-6">
          <article class="algo-card">
            <div class="algo-title">
              <i class="bi bi-cloud-arrow-down" aria-hidden="true"></i>
              <h4>Static File Replication</h4>
            </div>
            <p class="algo-body">
              Uploaded files are stored locally and <strong>replicated to a neighbor node</strong> via one-hop HTTP POST.
              If the origin node fails, the replica node still serves the file, maintaining <strong>data availability</strong> without complex quorum protocols.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- Evaluation -->
    <section class="evaluation-section">
      <h2>Evaluation & Results</h2>
      <div class="row g-4 eval-grid">
        <div class="col-12 col-md-4">
          <div class="eval-card">
            <div class="eval-icon" aria-hidden="true">
              <i class="bi bi-shield-check"></i>
            </div>
            <div class="eval-title">
              <h5>Failure Handling</h5>
              <span class="eval-pill">Rapid Gossip</span>
            </div>
            <p class="eval-body">
              Simulated EC2 crashes showed detection within <strong>10~15 ms</strong>, verified through gossip propagation and heartbeat logs.
              Static file replication guaranteed full accessibility of uploaded content during failures.
            </p>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="eval-card">
            <div class="eval-icon" aria-hidden="true">
              <i class="bi bi-arrow-repeat"></i>
            </div>
            <div class="eval-title">
              <h5>Consistency</h5>
              <span class="eval-pill">RabbitMQ Sync</span>
            </div>
            <p class="eval-body">
              <ul>
                <li>Product: updates converge across nodes in <strong>≤ ~0.3 s</strong> via RabbitMQ.</li>
                <li>Orders: MVCC enforced single-writer success per version, proving correctness under concurrency.</li>
              </ul>
            </p>
          </div>
        </div>
        <div class="col-12 col-md-4">
          <div class="eval-card">
            <div class="eval-icon" aria-hidden="true">
              <i class="bi bi-speedometer2"></i>
            </div>
            <div class="eval-title">
              <h5>Concurrency</h5>
              <span class="eval-pill">MVCC Safety</span>
            </div>
            <p class="eval-body">
              Stress tests with 50 concurrent clients achieved over <strong>1200 requests/sec</strong>.
              Routing and sharding added minimal latency (~5 ms), and MVCC prevented any race conditions or data loss, confirming the efficiency of the concurrency model.
            </p>
          </div>
        </div>
      </div>
      <figure class="img-card clickable-img eval-figure">
        <img
          :src="staticImage"
          alt="Static File Communication Diagram"
          @click="openImageModal(staticImage, 'Static file forwarding & neighbor replication.')"
        >
        <figcaption>Static file forwarding & neighbor replication.</figcaption>
      </figure>
    </section>

    <!-- Tech stack -->
    <section>
      <h2>Tech Stack</h2>
      <ul class="chips">
        <li>Spring Boot</li>
        <li>RabbitMQ (AMQP)</li>
        <li>SQLite (shards)</li>
        <li>GossipProtocol</li>
        <li>Heartbeats</li>
        <li>UDP + HTTP</li>
        <li>Replication</li>
        <li>LoadBalancing</li>
        <li>HMAC-SHA256</li>
        <li>AWS EC2</li>
      </ul>
    </section>
  </section>

  <!-- Image Modal -->
  <div 
    v-if="showImageModal" 
    class="image-modal"
    @click="closeImageModal"
  >
    <div class="image-modal-content">
      <button class="modal-close-btn" @click="closeImageModal" aria-label="Close">
        <i class="bi bi-x-lg"></i>
      </button>
      <img :src="modalImageSrc" :alt="modalImageCaption">
      <p v-if="modalImageCaption" class="modal-caption">{{ modalImageCaption }}</p>
    </div>
  </div>

  <FooterComponent />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import FooterComponent from '@/components/FooterComponent.vue';

// Import images
import staticImage from '@/assets/images/sharding/diagram-comm-static.png';
import componentsImage from '@/assets/images/sharding/diagram-components.png';
import deploymentImage from '@/assets/images/sharding/diagram-deployment.png';
import orderSeqImage from '@/assets/images/sharding/diagram-sequence-order.png';
import productSeqImage from '@/assets/images/sharding/diagram-sequence-product.png';
import hashImage from '@/assets/images/sharding/strategy-hash.png';
import rangeImage from '@/assets/images/sharding/strategy-range.png';

export default {
  name: "DistributedShardingDB",
  components: {
    NavBar,
    FooterComponent
  },
  data() {
    return {
      staticImage,
      componentsImage,
      deploymentImage,
      orderSeqImage,
      productSeqImage,
      hashImage,
      rangeImage,
      projectReport: require('@/assets/pdfs/Distributed_Database_Final_Project.pdf'),
      showImageModal: false,
      modalImageSrc: '',
      modalImageCaption: ''
    };
  },
  methods: {
    openImageModal(imageSrc, caption = '') {
      this.modalImageSrc = imageSrc;
      this.modalImageCaption = caption;
      this.showImageModal = true;
      // 防止背景滾動
      document.body.style.overflow = 'hidden';
    },
    closeImageModal() {
      this.showImageModal = false;
      this.modalImageSrc = '';
      this.modalImageCaption = '';
      // 恢復背景滾動
      document.body.style.overflow = '';
    }
  },
  mounted() {
    // Optional: basic scroll-to-top on route enter
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  beforeUnmount() {
    // 確保離開頁面時恢復滾動
    document.body.style.overflow = '';
  }
};
</script>