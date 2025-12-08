# 14. Synthetic Data & Sim2Real

## The Data Gap
Deep Learning needs massive data. Real robots are slow and breakable.
**Synthetic Data Generation (SDG)** allows us to generate millions of labeled training images (Segmentation, Bounding Boxes) in simulation.

## Domain Randomization
To cross the "Reality Gap", we randomize:
- **Textures**: Change floor/wall colors.
- **Lighting**: Move sun, change intensity.
- **Physics**: Randomize friction, mass, damping.

If the model learns to ignore these variations, it becomes robust to the real world.

## Replicator
Isaac Sim's **Replicator** API automates this.
```python
import omni.replicator.core as rep

with rep.new_layer():
    camera = rep.create.camera()
    render_product = rep.create.render_product(camera, (1024, 1024))
    
    # Randomize position
    cube = rep.create.cube()
    with rep.trigger.on_frame(num_frames=100):
        with rep.create.group([cube]):
             rep.modify.pose(
                 position=rep.distribution.uniform((-10, -10, 0), (10, 10, 0)),
                 scale=rep.distribution.uniform(0.1, 2.0)
             )
```
